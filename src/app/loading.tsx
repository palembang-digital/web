import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="content-wrapper">
      <div className="content space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-[25rem] w-full rounded-xl" />
        <div className="flex space-x-3">
          <Skeleton className="h-[10rem] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
