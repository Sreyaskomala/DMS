import { LogForm } from "@/components/log-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { Activity } from "lucide-react";

export default function DashboardPage({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* IDF Style Header */}
            <header className="bg-white border-b-4 border-[#003E7E] sticky top-0 z-50">
                <div className="container h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-[#003E7E] rounded-md flex items-center justify-center text-white">
                                <Activity className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-black text-[#003E7E] tracking-tight hidden sm:inline-block">Insulin<span className="text-[#009CDF]">Inside</span></span>
                        </Link>
                    </div>
                    <nav className="flex items-center gap-6">
                        <Link href="/dashboard" className="text-sm font-bold text-[#003E7E] border-b-2 border-[#003E7E] py-5">
                            Dashboard
                        </Link>
                        <Link href="/dashboard/analytics" className="text-sm font-bold text-slate-500 hover:text-[#009CDF] transition-colors">
                            Analytics
                        </Link>
                        <Link href="/marketplace" className="text-sm font-bold text-slate-500 hover:text-[#009CDF] transition-colors">
                            Store
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <UserNav />
                    </div>
                </div>
            </header>

            <main className="container py-8 px-4 sm:px-6 lg:px-8">
                {/* We will inject the Log Form or Analytics content here */}
                <DashboardContent />
            </main>
        </div>
    );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function DashboardContent() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#003E7E]">My Health Log</h1>
                    <p className="text-slate-600">Track your vitals and medications for today.</p>
                </div>
                <Button variant="outline" className="border-[#003E7E] text-[#003E7E] hover:bg-blue-50 font-bold">
                    <Link href="/dashboard/analytics">View Analytics</Link>
                </Button>
            </div>

            <div className="grid gap-6">
                <Card className="border-t-4 border-t-[#009CDF] shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-[#003E7E]">New Entry</CardTitle>
                        <CardDescription>Fill out the details below to update your records.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LogForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
