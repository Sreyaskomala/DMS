import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type Role = "patient" | "partner" | "admin";
export type Identity = { email: string; role: Role };

export async function identity(): Promise<Identity | null> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();
  if (!email) return null;
  // Roles are assigned by administrators, never by self-registration.
  const rows = await dbRead<{ role: Role }>("members", "select=role&email=eq." + encodeURIComponent(email) + "&limit=1");
  return { email, role: rows[0]?.role ?? "patient" };
}

function credentials() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Database not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  return { url, key };
}
async function request<T>(table: string, query: string, method: string, data?: unknown): Promise<T> {
  const { url, key } = credentials();
  const response = await fetch(url + "/rest/v1/" + table + (query ? "?" + query : ""), {
    method,
    headers: {
      apikey: key,
      Authorization: "Bearer " + key,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: data === undefined ? undefined : JSON.stringify(data),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Database request failed (" + response.status + ")");
  return response.json() as Promise<T>;
}
export const dbRead = <T>(table: string, query = "") => request<T[]>(table, query, "GET");
export const dbInsert = <T>(table: string, data: unknown) => request<T[]>(table, "", "POST", data);
export const dbUpdate = <T>(table: string, query: string, data: unknown) => request<T[]>(table, query, "PATCH", data);
export function responseError(error: unknown) {
  if (error instanceof Error && error.message.startsWith("Database not configured")) return { error: "Service not configured" };
  console.error("Insulin Inside API error", error instanceof Error ? error.message : "Unknown error");
  return { error: "Request could not be processed" };
}
