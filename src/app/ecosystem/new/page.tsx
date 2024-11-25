import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import NotAuthenticated from "@/components/not-authenticated";
import NewOrganizationForm from "@/components/organizations/new-organization-form";
import { ScrollArea } from "@/components/scroll-area";
import { TypographyH4 } from "@/components/ui/typography";

export default async function Page() {
  const session = await auth();

  // @ts-ignore
  if (!session) {
    return <NotAuthenticated />;
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Organisasi baru" />
      <div className="content-wrapper">
        <div className="content">
          <TypographyH4>Organisasi baru</TypographyH4>
          <div className="mt-4">
            <NewOrganizationForm />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
