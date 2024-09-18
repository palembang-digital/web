import "@/app/globals.css";
import { auth } from "@/auth";
import { MenuContent } from "@/components/menu-content";
import { SideMenu } from "@/components/side-menu";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";
import newrelic from "newrelic";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import Script from "next/script";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Palembang Digital",
  description:
    "Platform komunitas yang menghubungkan ribuan penggiat IT di Sumatera Selatan",
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
  const session = await auth();

  if (newrelic.agent.collector.isConnected() === false) {
    await new Promise((resolve) => {
      newrelic.agent.on("connected", resolve);
    });
  }

  const browserTimingHeader = newrelic.getBrowserTimingHeader({
    hasToRemoveScriptWrapper: true,
    allowTransactionlessInjection: true,
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        id="nr-browser-agent"
        dangerouslySetInnerHTML={{ __html: browserTimingHeader }}
      />

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        <main vaul-drawer-wrapper="" className="min-h-screen bg-white">
          <div className="lg:flex">
            <SideMenu className="relative hidden lg:flex">
              <MenuContent session={session} />
            </SideMenu>
            <div className="flex flex-1">{children}</div>
          </div>
        </main>
        <Toaster richColors />
      </body>
      <GoogleAnalytics gaId="UA-169186060-1" />
    </html>
  );
}
