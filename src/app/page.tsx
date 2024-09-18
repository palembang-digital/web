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
import { organizations, users } from "@/db/schema";
import { count, eq } from "drizzle-orm";

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

  const members = await db.select({ count: count() }).from(users);
  const membersCount = members.length > 0 ? members[0].count : 0;

  const orgs = await db.select({ count: count() }).from(organizations);
  const orgsCount = orgs.length > 0 ? orgs[0].count : 0;

  const startups = await db
    .select({ count: count() })
    .from(organizations)
    .where(eq(organizations.organizationType, "startup"));
  const startupsCount = startups.length > 0 ? startups[0].count : 0;

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Palembang Digital" />
      <div className="content-wrapper">
        <div className="content">
          <Hero
            eventCount={events.length}
            memberCount={membersCount}
            startupCount={startupsCount}
            organizationCount={orgsCount - startupsCount}
          />
          {upcomingEvents && upcomingEvents.length > 0 && (
            <div className="mt-16">
              <UpcomingEvents events={upcomingEvents} />
            </div>
          )}
          <div className="mt-16">
            <PastEvents events={pastEvents} />
          </div>
          <LandingAboutUs />
          <LandingFAQ />
          <LandingContactUs />
        </div>
      </div>
      <LandingFooter />
    </ScrollArea>
  );
}
