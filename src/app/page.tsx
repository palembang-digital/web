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
import Videos from "@/components/videos/videos";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getEvents, getVideos } from "@/services";
import { count } from "drizzle-orm";

export default async function Page() {
  const session = await auth();

  const eventsData = getEvents();
  const videosData = getVideos();
  const membersData = db.select({ count: count() }).from(users);

  const [events, videos, members] = await Promise.all([
    eventsData,
    videosData,
    membersData,
  ]);

  const upcomingEvents = events.filter(
    (event) => new Date(event.scheduledStart) >= new Date()
  );
  const pastEvents = events.filter(
    (event) => new Date(event.scheduledStart) < new Date()
  );

  const membersCount = members.length > 0 ? members[0].count : 0;

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Palembang Digital" />
      <div className="content-wrapper">
        <div className="content">
          <Hero
            eventCount={events.length}
            videoCount={videos.length}
            memberCount={membersCount}
          />
          {upcomingEvents && upcomingEvents.length > 0 && (
            <div className="mt-16">
              <UpcomingEvents events={upcomingEvents} />
            </div>
          )}
          <div className="mt-16">
            <PastEvents events={pastEvents.slice(0, 6)} />
          </div>
          <div className="mt-16">
            <Videos videos={videos.slice(0, 6)} />
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
