import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="space-y-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className="h-12 w-full" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
