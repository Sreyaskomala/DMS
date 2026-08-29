import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware() {
    // Allow public and guest navigation seamlessly
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/marketplace/:path*", "/pharmacy-portal/:path*"],
};

