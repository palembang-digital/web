"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import PastEvents from "../past-events";
import UpcomingEvents from "./upcoming-events";

export default function EventList({
  showSeeMoreButton,
  limit = 1000,
  pastEventsLimit = -1,
}: {
  showSeeMoreButton?: boolean;
  limit?: number;
  pastEventsLimit?: number;
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
    data.filter((event: any) => new Date(event.scheduledEnd) < new Date());

  return (
    <div>
      {upcomingEvents && upcomingEvents.length > 0 && (
        <div className="mb-16">
          <UpcomingEvents events={upcomingEvents} />
        </div>
      )}
      <PastEvents
        events={pastEvents.slice(0, pastEventsLimit)}
        showSeeMoreButton={showSeeMoreButton}
      />
    </div>
  );
}
