import "@/app/globals.css";
import { MenuContent } from "@/components/menu-content";
import { SideMenu } from "@/components/side-menu";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Palembang Digital",
  description:
    "Platform komunitas yang menghubungkan ribuan penggiat IT di Palembang, Sumatera Selatan",
};

export const viewport: Viewport = {
  themeColor: "white",
  colorScheme: "only light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
              <MenuContent />
            </SideMenu>
            <div className="flex flex-1">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
