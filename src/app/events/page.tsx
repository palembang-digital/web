import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import PastEvents from "@/components/past-events";
import { ScrollArea } from "@/components/scroll-area";
import UpcomingEvents from "@/components/upcoming-events";
import { db } from "@/db";

export default async function Page() {
  const session = await auth();

  const events = await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.scheduledStart)],
  });

  const upcomingEvents = events.filter(
    (event) => new Date(event.scheduledStart) >= new Date()
  );

  const pastEvents = events.filter(
    (event) => new Date(event.scheduledStart) < new Date()
  );

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Kegiatan Patal" />
      <div className="content-wrapper">
        <div className="content">
          <UpcomingEvents events={upcomingEvents} />
          <PastEvents events={pastEvents} hideSeeMoreButton />
        </div>
      </div>
    </ScrollArea>
  );
}
