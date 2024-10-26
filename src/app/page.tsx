import EventList from "@/components/events/event-list";
import { FloatingHeader } from "@/components/floating-header";
import Hero from "@/components/landing/hero";
import LandingAboutUs from "@/components/landing/landing-about-us";
import LandingContactUs from "@/components/landing/landing-contact-us";
import LandingFAQ from "@/components/landing/landing-faq";
import LandingFooter from "@/components/landing/landing-footer";
import { ScrollArea } from "@/components/scroll-area";
import Videos from "@/components/videos/videos";
import { getSession } from "@/services/auth";

export default async function Page() {
  const session = await getSession();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Palembang Digital" />

      <div className="content-wrapper">
        <div className="content">
          <Hero session={session} />

          <div className="mt-16">
            <EventList pastEventsLimit={6} showSeeMoreButton />
          </div>

          <div className="mt-16">
            <Videos limit={6} />
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
