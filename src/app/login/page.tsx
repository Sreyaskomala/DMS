"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Activity } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    const loginWithGoogle = async () => {
        setIsLoading(true)
        try {
            await signIn("google", { callbackUrl: "/dashboard" })
        } catch (error) {
            console.error("Login failed", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Visual */}
            <div className="relative hidden lg:flex flex-col justify-between p-12 bg-[#003E7E] text-white">
                <div className="z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                            <Activity className="h-6 w-6 text-[#003E7E]" />
                        </div>
                        <span className="text-2xl font-black tracking-tight">Insulin<span className="text-[#009CDF]">Inside</span></span>
                    </div>
                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        Manage your diabetes <br /> with confidence.
                    </h1>
                    <p className="text-lg text-blue-100 max-w-md">
                        Join the global community. Track your health, access insights, and stay connected.
                    </p>
                </div>

                {/* Background Patterns */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-[#009CDF] rounded-full blur-3xl"></div>
                    <div className="absolute -left-20 bottom-0 w-[400px] h-[400px] bg-[#E31C79] rounded-full blur-3xl"></div>
                </div>

                <div className="z-10 text-sm text-blue-200">
                    © 2026 Insulin Inside International.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-[#003E7E]">Welcome Back</h2>
                        <p className="text-slate-500 mt-2">Sign in to access your dashboard</p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={loginWithGoogle}
                            disabled={isLoading}
                            className="w-full h-12 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-bold flex items-center justify-center gap-3 text-base"
                        >
                            {isLoading ? (
                                "Connecting..."
                            ) : (
                                <>
                                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Continue with Google
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="text-center text-xs text-slate-400">
                        By continuing, you agree to our <Link href="#" className="underline hover:text-[#003E7E]">Terms of Service</Link> and <Link href="#" className="underline hover:text-[#003E7E]">Privacy Policy</Link>.
                    </div>
                </div>
            </div>
        </div>
    )
}
