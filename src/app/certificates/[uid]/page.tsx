import { auth } from "@/auth";
import CeriticateDownload from "@/components/certificates/download";
import { FloatingHeader } from "@/components/floating-header";
import NewOrganizationForm from "@/components/organizations/new-organization-form";
import { ScrollArea } from "@/components/scroll-area";
import { TypographyH4 } from "@/components/ui/typography";

interface Params {
  params: {uid: string}
}

export default async function Page({params}: Params) {
  const session = await auth();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Sertifikat" />
      <div className="content-wrapper">
        <div className="content">
          <TypographyH4>Certificate</TypographyH4>

          <div className="p-6 rounded-lg border border-zinc-300 my-6">
            <CeriticateDownload />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
