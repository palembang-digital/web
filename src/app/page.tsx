import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import Hero from "@/components/hero";
import { ScrollArea } from "@/components/scroll-area";
import UpcomingEvents from "@/components/upcoming-events";
import { db } from "@/db";

export default async function Page() {
  const session = await auth();

  const events = await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.scheduledStart)],
  });

  const upcomingEvents = events.slice(0, 3);

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Palembang Digital" />
      <div className="content-wrapper">
        <div className="content">
          <Hero
            eventCount={events.length}
            startupCount={45}
            organizationCount={34}
          />

          <UpcomingEvents events={upcomingEvents} />
        </div>
      </div>
    </ScrollArea>
  );
}
