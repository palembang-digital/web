"use client";

import EventDiscussionCard from "@/components/events/event-discussion/event-discussion-card";

export default function EventDiscussionList({
  session,
  event,
  discussions,
  isLoading,
}: {
  session: any;
  event: any;
  discussions: any[];
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      {discussions && discussions.length > 0 ? (
        discussions
          .filter((discussion: any) => discussion.parentId === null)
          .map((discussion: any) => (
            <EventDiscussionCard
              key={discussion.id}
              session={session}
              event={event}
              discussion={discussion}
              comments={discussions.filter(
                (comment: any) => comment.parentId === discussion.id
              )}
            />
          ))
      ) : (
        <div className="text-neutral-500 text-sm">Belum ada diskusi</div>
      )}
    </div>
  );
}
