import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import Hero from "@/components/hero";
import LandingAboutUs from "@/components/landing-about-us";
import LandingFAQ from "@/components/landing-faq";
import LandingFooter from "@/components/landing-footer";
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

  const pastEvents = events
    .filter((event) => new Date(event.scheduledStart) < new Date())
    .slice(0, 6);

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
          {upcomingEvents && <UpcomingEvents events={upcomingEvents} />}
          <PastEvents events={pastEvents} />
          <LandingAboutUs />
          <LandingFAQ />
          <LandingFooter />
        </div>
      </div>
    </ScrollArea>
  );
}
