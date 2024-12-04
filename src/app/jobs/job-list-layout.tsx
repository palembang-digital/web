"use client";

import { fetcher } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import JobLink from "./job-link";

export default function JobListLayout({ isMobile }: { isMobile?: boolean }) {
  const { data, isLoading } = useSWR(`/api/v1/jobs`, fetcher);

  const pathname = usePathname();

  if (isLoading) {
    return <div className="p-6">Loading our awesome jobs...</div>;
  }

  return (
    <div className={cn(!isMobile && "flex flex-col gap-1 text-sm")}>
      {data
        .filter((job: any) => job.status === "published")
        .sort((a: { createdAt: number }, b: { createdAt: number }) =>
          a.createdAt < b.createdAt ? 1 : -1
        )
        .map((job: any) => {
          const isActive = pathname === `/jobs/${job.id}`;

          return (
            <JobLink
              key={job.slug}
              job={job}
              isMobile={isMobile}
              isActive={isActive}
            />
          );
        })}
    </div>
  );
}
