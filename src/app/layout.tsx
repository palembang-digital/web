import "@/app/globals.css";
import { auth } from "@/auth";
import { MenuContent } from "@/components/menu-content";
import { SideMenu } from "@/components/side-menu";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";

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

  return (
    <html lang="en" suppressHydrationWarning>
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
        <Analytics />
      </body>
      <GoogleAnalytics gaId="UA-169186060-1" />
    </html>
  );
}
