import { FloatingHeader } from "@/components/floating-header";
import NewJobForm from "@/components/jobs/new-job-form";
import { ScrollArea } from "@/components/scroll-area";
import { TypographyH3 } from "@/components/ui/typography";
import { getSession } from "@/services/auth";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    return <p>Not authenticated. Please log in first.</p>;
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader
        session={session}
        scrollTitle="Buat Lowongan Pekerjaan Baru"
      />

      <div className="content-wrapper">
        <div className="content">
          <div className="flex flex-col gap-4 items-start justify-between">
            <TypographyH3 className="text-neutral-800 mb-2">
              Buat Lowongan Kerja Baru
            </TypographyH3>
            <NewJobForm />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
