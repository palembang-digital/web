import { auth } from '@/auth';
import { FloatingHeader } from '@/components/floating-header';
import { ScrollArea } from '@/components/scroll-area';
import EventList from '@/components/events/event-llist';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Page() {
  const session = await auth();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Kegiatan Patal" />
      <div className="content-wrapper">
        <div className="content">
          <Suspense fallback={<Skeleton className="h-12 w-full" />}>
            <EventList />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  );
}
