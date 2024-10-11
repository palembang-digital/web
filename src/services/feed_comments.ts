import { db } from "@/db";
import { cache } from "react";

export const getFeedComments = cache(async (feedId: number) => {
  const comments = await db.query.feedsComments.findMany({
    orderBy: (feedsComments, { asc }) => [asc(feedsComments.createdAt)],
    where: (feedsComments, { eq }) => eq(feedsComments.feedId, feedId),
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

  return comments;
});
