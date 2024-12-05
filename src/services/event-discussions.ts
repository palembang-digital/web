import { db } from "@/db";
import { cache } from "react";

export const getEventDiscussions = cache(async (eventId: number) => {
  const discussions = await db.query.eventsDiscussions.findMany({
    orderBy: (eventsDiscussions, { desc }) => [
      desc(eventsDiscussions.createdAt),
    ],
    where: (eventsDiscussions, { eq }) =>
      eq(eventsDiscussions.eventId, eventId),
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });

  return discussions;
});
