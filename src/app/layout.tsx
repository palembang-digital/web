import "@/app/globals.css";
import Loading from "@/app/loading";
import GoogleAdsense from "@/components/google-adsense";
import { MenuContent } from "@/components/menu-content";
import { SideMenu } from "@/components/side-menu";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { getSession } from "@/services/auth";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Palembang Digital",
    template: "%s · Palembang Digital",
  },
  description:
    "Platform komunitas yang menghubungkan ribuan penggiat IT di Sumatera Selatan",
  applicationName: "Palembang Digital",
  authors: [
    { name: "Palembang Digital", url: "https://www.palembangdigital.org" },
  ],
  creator: "Palembang Digital",
  publisher: "Palembang Digital",
  keywords: [
    "Palembang",
    "Digital",
    "Komunitas",
    "IT",
    "Sumatera Selatan",
    "Startup",
    "Programmer",
    "Developer",
    "Designer",
    "Tech",
    "Community",
  ],
  openGraph: {
    title: `Palembang Digital`,
    description: `Komunitas kolaborasi · Dari wong kito, untuk wong kito!`,
    images: `/og.png`,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "white",
  colorScheme: "only light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const googleAdsenseClientId = process.env.GOOGLE_ADSENSE_CLIENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        <NextTopLoader
          color="#0f172a"
          height={2}
          shadow="0 0 10px #0f172a,0 0 5px #0f172a"
          showSpinner={false}
        />
        <TooltipProvider>
          <main vaul-drawer-wrapper="" className="min-h-screen bg-white">
            <div className="lg:flex">
              <SideMenu className="relative hidden lg:flex">
                <MenuContent session={session} />
              </SideMenu>
              <div className="flex flex-1">
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </div>
            </div>
          </main>
        </TooltipProvider>
        <Toaster richColors />
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId="UA-169186060-1" />
      {googleAdsenseClientId && (
        <GoogleAdsense clientId={googleAdsenseClientId} />
      )}
    </html>
  );
}
