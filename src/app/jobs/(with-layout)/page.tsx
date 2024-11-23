import JobListLayout from "@/app/jobs/job-list-layout";
import Loading from "@/app/loading";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { getSession } from "@/services/auth";
import { Suspense } from "react";

export default async function Page() {
  const session = await getSession();

  return (
    <ScrollArea useScrollAreaId className="lg:hidden">
      <FloatingHeader session={session} scrollTitle="Pekerjaan" />
      <Suspense fallback={<Loading />}>
        <JobListLayout isMobile />
      </Suspense>
    </ScrollArea>
  );
}
