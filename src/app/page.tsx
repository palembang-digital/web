import Loading from "@/app/loading";
import EventList from "@/components/events/event-list";
import { FloatingHeader } from "@/components/floating-header";
import Hero from "@/components/landing/hero";
import LandingAboutUs from "@/components/landing/landing-about-us";
import LandingContactUs from "@/components/landing/landing-contact-us";
import LandingFAQ from "@/components/landing/landing-faq";
import { ScrollArea } from "@/components/scroll-area";
import Videos from "@/components/videos/videos";
import { getSession } from "@/services/auth";
import { Suspense, lazy } from "react";

const LandingFooter = lazy(() => import("@/components/landing/landing-footer"));

export default async function Page() {
  const session = await getSession();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Palembang Digital" />

      <div className="content-wrapper">
        <div className="content">
          <Suspense fallback={<Loading />}>
            <Hero session={session} />
          </Suspense>

          <div className="mt-16">
            <Suspense fallback={<Loading />}>
              <EventList pastEventsLimit={6} showSeeMoreButton />
            </Suspense>
          </div>

          <div className="mt-16">
            <Suspense fallback={<Loading />}>
              <Videos limit={6} />
            </Suspense>
          </div>

          <Suspense fallback={<Loading />}>
            <LandingAboutUs />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <LandingFAQ />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <LandingContactUs />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        <LandingFooter />
      </Suspense>
    </ScrollArea>
  );
}
