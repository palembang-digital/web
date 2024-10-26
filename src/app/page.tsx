import Loading from "@/app/loading";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { getSession } from "@/services/auth";
import { Suspense, lazy } from "react";

const LandingFooter = lazy(() => import("@/components/landing/landing-footer"));
const EventList = lazy(() => import("@/components/events/event-list"));
const Hero = lazy(() => import("@/components/landing/hero"));
const LandingAboutUs = lazy(
  () => import("@/components/landing/landing-about-us")
);
const LandingContactUs = lazy(
  () => import("@/components/landing/landing-contact-us")
);
const LandingFAQ = lazy(() => import("@/components/landing/landing-faq"));
const Videos = lazy(() => import("@/components/videos/videos"));

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
