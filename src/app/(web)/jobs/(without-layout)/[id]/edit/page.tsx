import { FloatingHeader } from "@/components/floating-header";
import EditJobForm from "@/components/jobs/edit-job-form";
import NotAuthenticated from "@/components/not-authenticated";
import { ScrollArea } from "@/components/scroll-area";
import { TypographyH3 } from "@/components/ui/typography";
import { getJob } from "@/services";
import { getSession } from "@/services/auth";

export default async function Page({ params }: { params: { id: number } }) {
  const session = await getSession();
  if (!session) {
    return <NotAuthenticated />;
  }

  const job = await getJob(params.id);
  if (!job) {
    return <p>Job not found</p>;
  }

  // @ts-ignore
  const isAdmin = session?.user?.role === "administrator";
  // @ts-ignore
  const isOwner = session?.user?.id === job.createdBy;
  const canEdit = isAdmin || isOwner;
  if (!canEdit) {
    return <p>Not authorized</p>;
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Edit Lowongan Pekerjaan" />

      <div className="content-wrapper">
        <div className="content">
          <div className="flex flex-col gap-4 items-start justify-between">
            <TypographyH3 className="text-neutral-800 mb-2">
              Edit Lowongan Kerja Baru
            </TypographyH3>
            <EditJobForm job={job} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
