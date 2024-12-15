import { db } from "@/db";
import { cache } from "react";

export const getFeeds = cache(async () => {
  const feeds = await db.query.feeds.findMany({
    orderBy: (feeds, { desc }) => [desc(feeds.createdAt)],
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
      likes: {
        with: {
          user: {
            columns: { id: true, name: true, username: true, image: true },
          },
        },
      },
      comments: true,
    },
  });

  return feeds;
});

export const getPost = cache(async (id: number) => {
  const post = await db.query.feeds.findFirst({
    where: (feeds, { eq }) => eq(feeds.id, id),
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
      likes: {
        with: {
          user: {
            columns: { id: true, name: true, username: true, image: true },
          },
        },
      },
      comments: true,
    },
  });

  return post;
});
