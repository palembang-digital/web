import { FloatingHeader } from "@/components/floating-header";
import JobDescription from "@/components/jobs/job-description";
import { ScrollArea } from "@/components/scroll-area";
import { SignIn } from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import { getJob } from "@/services";
import { getSession } from "@/services/auth";
import { DollarSignIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: { params: { id: number } }) {
  const session = await getSession();

  const job = await getJob(params.id);
  if (!job) {
    return <p>Job not found</p>;
  }

  return (
    <>
      <ScrollArea className="bg-white" useScrollAreaId>
        <FloatingHeader
          scrollTitle={job.title}
          session={session}
          goBackLink="/jobs"
        />

        <div className="content-wrapper">
          <article className="content">
            {session?.user?.id === job.createdBy && (
              <div className="mb-2">
                <Link href={`/jobs/${job.id}/edit`}>Edit</Link>
              </div>
            )}

            <div className="border border-slate-200 rounded-lg p-4 flex flex-col gap-2">
              <TypographyH2 className="text-sm pb-0">
                {job.company}
              </TypographyH2>
              <TypographyH3>{job.title}</TypographyH3>
              <div>
                <p className="text-xs text-neutral-500 capitalize">
                  {job.location} · {job.workplaceType} · {job.jobType}
                </p>
              </div>
              <div>
                {session ? (
                  <Link href={job.applicationUrl || ""} target="_blank">
                    <Button className="mt-1 text-xs bg-green-600 hover:bg-green-500">
                      Lamar <SquareArrowOutUpRightIcon className="w-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <SignIn text="Masuk untuk melamar" className="mt-1 text-xs" />
                )}
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 flex flex-col gap-2 mt-4">
              <TypographyH3 className="text-md">Deskripsi</TypographyH3>
              <JobDescription description={job.description} />
            </div>

            {job.salary && (
              <div className="border border-slate-200 rounded-lg p-4 flex flex-col gap-2 mt-4">
                <div className="flex flex-row gap-3 items-center">
                  <div className="rounded-md p-4 border text-md text-center">
                    <DollarSignIcon />
                  </div>
                  <div>
                    <TypographyH2 className="text-md pb-0">Gaji</TypographyH2>
                    <p className="text-xs text-neutral-500">{job.salary}</p>
                  </div>
                </div>
              </div>
            )}
          </article>
        </div>
      </ScrollArea>
    </>
  );
}
