import { Skeleton } from '@/components/ui/skeleton';

export function EventSkeletonLoading() {
  return (
    <div className="content-wrapper">
      <div className="content">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[25rem] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
