"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import PastEvents from "../past-events";
import UpcomingEvents from "./upcoming-events";

export default function EventList({
  showSeeMoreButton,
  limit = 1000,
  pastEventsLimit = -1,
  showAds = false,
}: {
  showSeeMoreButton?: boolean;
  limit?: number;
  pastEventsLimit?: number;
  showAds?: boolean;
}) {
  const { data, isLoading } = useSWR(`/api/v1/events?limit=${limit}`, fetcher);

  if (isLoading) {
    return <div className="p-6">Loading our awesome activities...</div>;
  }

  const upcomingEvents =
    data &&
    data.filter(
      (event: any) =>
        new Date(event.scheduledEnd) >= new Date() &&
        event.status === "published"
    );
  const pastEvents =
    data &&
    data.filter(
      (event: any) =>
        new Date(event.scheduledEnd) < new Date() &&
        (event.status === "published" || event.status === "completed")
    );

  return (
    <div>
      {upcomingEvents && upcomingEvents.length > 0 && (
        <div className="mb-16">
          <UpcomingEvents events={upcomingEvents} />
        </div>
      )}
      {pastEvents && pastEvents.length > 0 && (
        <PastEvents
          events={pastEvents.slice(0, pastEventsLimit)}
          showSeeMoreButton={showSeeMoreButton}
          showAds={showAds}
        />
      )}
    </div>
  );
}
