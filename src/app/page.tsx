import { auth } from "@/auth";
import UpcomingEvents from "@/components/events/upcoming-events";
import { FloatingHeader } from "@/components/floating-header";
import Hero from "@/components/landing/hero";
import LandingAboutUs from "@/components/landing/landing-about-us";
import LandingContactUs from "@/components/landing/landing-contact-us";
import LandingFAQ from "@/components/landing/landing-faq";
import LandingFooter from "@/components/landing/landing-footer";
import PastEvents from "@/components/past-events";
import { ScrollArea } from "@/components/scroll-area";
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

  const orgs = await db.query.organizations.findMany();
  const startups = orgs.filter((org) => org.organizationType === "startup");

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Palembang Digital" />
      <div className="content-wrapper">
        <div className="content">
          <Hero
            eventCount={events.length}
            startupCount={startups.length}
            organizationCount={orgs.length - startups.length}
          />
          {upcomingEvents && (
            <div className="mt-16">
              <UpcomingEvents events={upcomingEvents} />
            </div>
          )}
          <PastEvents events={pastEvents} />
          <LandingAboutUs />
          <LandingFAQ />
          <LandingContactUs />
        </div>
      </div>
      <LandingFooter />
    </ScrollArea>
  );
}
