"use client";

import Loading from "@/app/loading";
import EventDiscussionList from "@/components/events/event-discussion/event-discussion-list";
import NewPostForm from "@/components/events/event-discussion/new-post-form";
import { TypographyH4 } from "@/components/ui/typography";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function EventDiscussionPanel({
  session,
  event,
}: {
  session: any;
  event: any;
}) {
  const { data: discussions, isLoading } = useSWR(
    `/api/v1/events/${event.id}/discussion`,
    fetcher
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="discussion" className="col-span-1 sm:col-span-3 mt-4">
      <div className="flex flex-col gap-4">
        <TypographyH4>
          Diskusi{discussions?.length > 0 && ` (${discussions?.length})`}
        </TypographyH4>
        {session && <NewPostForm session={session} event={event} />}
        <EventDiscussionList
          session={session}
          event={event}
          discussions={discussions}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
