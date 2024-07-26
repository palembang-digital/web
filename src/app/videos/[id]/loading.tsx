import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="content-wrapper">
      <div className="content space-y-2">
        <Skeleton className="h-4 w-full" />
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[25rem] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
