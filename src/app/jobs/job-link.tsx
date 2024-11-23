import { cn } from "@/lib/utils";
import Link from "next/link";

export default function JobLink({
  job,
  isMobile,
  isActive,
}: {
  job: any;
  isMobile?: boolean;
  isActive?: boolean;
}) {
  return (
    <Link
      key={job.id}
      href={`/jobs/${job.id}`}
      className={cn(
        "flex flex-col gap-1 transition-colors duration-300",
        !isMobile && isActive ? "bg-black text-white" : "hover:bg-gray-200",
        isMobile
          ? "border-b px-4 py-3 text-sm hover:bg-gray-100"
          : "rounded-lg p-2"
      )}
    >
      <span className="font-medium">{job.title}</span>
      <span
        className={cn(
          "transition-colors duration-300 text-xs",
          isActive ? "text-slate-400" : "text-slate-500"
        )}
      >
        {job.company} · {job.location} ({job.workplaceType})
      </span>
    </Link>
  );
}
