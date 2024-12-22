import { SidebarNav } from "@/app/(web)/settings/components/sidebar-nav";
import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import NotAuthenticated from "@/components/not-authenticated";
import { ScrollArea } from "@/components/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengaturan",
};

const sidebarNavItems = [
  {
    title: "Profil",
    href: "/settings/profile",
  },
  {
    title: "Email",
    href: "/settings/email",
  },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // @ts-ignore
  if (!session) {
    return <NotAuthenticated />;
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Pengaturan" />
      <div className="content-wrapper">
        <div className="content">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Pengaturan</h2>
            <p className="text-muted-foreground">
              Atur profil dan preferensi lainnya.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
