import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { MarketingHeader } from "@/components/marketing-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Insulin Inside | India's Biggest Diabetes Platform & Chemist Network",
  description: "India's biggest diabetes platform — comprehensive diabetes companion, daily tracking, Indian meal guide, and verified local chemist access network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}>
        <div id="google_translate_element" className="fixed bottom-4 right-4 z-50 opacity-0 pointer-events-none"></div>
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.googleTranslateElementInit = function() {
                new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
              }
            `,
          }}
        />
        <Script
          id="google-translate-script"
          strategy="afterInteractive"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />
        <Providers>
          <MarketingHeader />
          {children}
          <SiteFooter />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
