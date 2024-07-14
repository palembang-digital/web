import EventsGrid from "@/components/events/events-grid";
import { FloatingHeader } from "@/components/floating-header";
import Hero from "@/components/hero";
import { ScrollArea } from "@/components/scroll-area";
import { db } from "@/db";

async function LandingPage() {
  const events = await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.scheduledStart)],
  });

  return (
    <>
      <Hero />
      <EventsGrid events={events} end={5} />
    </>
  );
}

export default async function Page() {
  const events = await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.scheduledStart)],
  });

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader scrollTitle="Palembang Digital" />
      <div className="content-wrapper">
        <div className="content">
          {/* <p>Dari wong kito, untuk wong kito</p> */}
          <Hero
            eventCount={events.length}
            startupCount={45}
            organizationCount={34}
          />
        </div>
      </div>
    </ScrollArea>
  );
}
