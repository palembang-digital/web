import JobList from "@/app/jobs/job-list";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import { getSession } from "@/services/auth";
import Link from "next/link";

export default async function Page() {
  const session = await getSession();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Pekerjaan" />

      <div className="content-wrapper">
        <div className="content">
          <p className="italic text-neutral-400">Jobs</p>
          <div className="flex items-start justify-between">
            <TypographyH2 className="text-neutral-800 mb-2">
              Lowongan Kerja
            </TypographyH2>
            {session ? (
              <Link href="/jobs/new">
                <Button variant="outline">Buat lowongan kerja</Button>
              </Link>
            ) : null}
          </div>

          <JobList />
        </div>
      </div>
    </ScrollArea>
  );
}
