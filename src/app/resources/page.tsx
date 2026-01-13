import { Button } from "@/components/ui/button";
import { Download, FileText, Smartphone, Printer, ExternalLink } from "lucide-react";

export default function ResourcesPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <header className="bg-slate-50 py-16 border-b border-slate-200">
                <div className="container px-6 text-center">
                    <h1 className="text-4xl font-black text-[#003E7E] mb-4">Downloads & Tools</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">Practical resources to help you manage your diabetes day-to-day. All files are free to download.</p>
                </div>
            </header>

            <div className="container px-6 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* PRINTABLES */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 bg-[#E31C79] rounded-lg flex items-center justify-center text-white">
                                <Printer className="h-5 w-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Printable Logs</h2>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Blood Glucose Log Sheet (Weekly)",
                                "Medication Schedule Tracker",
                                "Grocery Shopping Guide",
                                "Carb Counting Cheat Sheet"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                    <span className="font-medium text-slate-700">{item}</span>
                                    <Button variant="ghost" size="sm" className="text-[#009CDF]">
                                        <Download className="h-4 w-4 mr-2" /> PDF
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* DIGITAL TOOLS */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 bg-[#009CDF] rounded-lg flex items-center justify-center text-white">
                                <Smartphone className="h-5 w-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Digital Tools</h2>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { name: "Insulin Dosage Calculator", type: "Web App" },
                                { name: "BMI & Calorie Counter", type: "Tool" },
                                { name: "Medical ID Card Generator", type: "Service" },
                                { name: "Find a Doctor Near Me", type: "Map" }
                            ].map((item, i) => (
                                <li key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                    <span className="font-medium text-slate-700">{item.name}</span>
                                    <Button variant="ghost" size="sm" className="text-[#003E7E]">
                                        <ExternalLink className="h-4 w-4 mr-2" /> Open
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
