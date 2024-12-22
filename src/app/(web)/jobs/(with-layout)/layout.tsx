import JobListLayout from "@/app/(web)/jobs/job-list-layout";
import Loading from "@/app/loading";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { SideMenu } from "@/components/side-menu";
import { getSession } from "@/services/auth";
import Link from "next/link";
import { Suspense } from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <>
      <SideMenu
        title="Lowongan Kerja"
        isInner
        innerAction={
          session ? (
            <Link href="/jobs/new">
              <ShimmerButton>
                <span className="whitespace-pre-wrap text-center text-xs font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
                  Buat loker baru
                </span>
              </ShimmerButton>
            </Link>
          ) : null
        }
      >
        <Suspense fallback={<Loading />}>
          <JobListLayout />
        </Suspense>
      </SideMenu>

      <div className="flex flex-1 lg:bg-grid">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </>
  );
}
