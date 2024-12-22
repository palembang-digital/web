import JobListLayout from "@/app/(web)/jobs/job-list-layout";
import Loading from "@/app/loading";
import { FloatingHeader } from "@/components/floating-header";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { ScrollArea } from "@/components/scroll-area";
import { getSession } from "@/services/auth";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  const session = await getSession();

  return (
    <ScrollArea useScrollAreaId className="lg:hidden">
      <FloatingHeader session={session} scrollTitle="Pekerjaan" />
      <Suspense fallback={<Loading />}>
        <div className="px-4 py-3 border-b">
          <Link href="/jobs/new">
            <ShimmerButton>
              <span className="whitespace-pre-wrap text-center text-xs font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
                Buat loker baru
              </span>
            </ShimmerButton>
          </Link>
        </div>
        <JobListLayout isMobile />
      </Suspense>
    </ScrollArea>
  );
}
