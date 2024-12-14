import { auth } from "@/auth";
import CerticateDownload from "@/components/certificates/download";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { TypographyH4 } from "@/components/ui/typography";
import { db } from "@/db";
import { localeDate } from "@/lib/utils";

interface Params {
  params: { uuid: string };
}

export default async function Page({ params }: Params) {
  const session = await auth();

  const cert = await db.query.certificates.findFirst({
    where: (certificates, { eq }) => eq(certificates.id, params.uuid),
    with: {
      user: {
        columns: { name: true },
      },
      event: {
        columns: { name: true, scheduledStart: true, scheduledEnd: true },
      },
    },
  });

  if (!cert) {
    return (
      <ScrollArea useScrollAreaId>
        <FloatingHeader
          session={session}
          scrollTitle="Sertifikat tidak ditemukan"
        />
        <p>Certificate not found</p>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Sertifikat" />
      <div className="content-wrapper">
        <div className="content">
          <TypographyH4>Certificate</TypographyH4>

          <div className="p-6 rounded-lg border border-zinc-300 my-6">
            <CerticateDownload
              eventName={cert.event.name}
              recipientName={cert.user.name || ""}
              role={cert.role || ""}
              startDate={cert.event.scheduledStart}
              endDate={
                localeDate(cert.event.scheduledStart) !==
                localeDate(cert.event.scheduledEnd)
                  ? cert.event.scheduledEnd
                  : undefined
              }
              certificateCode={cert.id}
              certificateTitle="Sertifikat Apresiasi"
            />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
