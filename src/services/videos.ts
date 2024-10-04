import { db } from "@/db";
import { videos } from "@/db/schema";
import { count } from "drizzle-orm";
import { cache } from "react";

export const getVideosCount = cache(async () => {
  return await db.select({ count: count() }).from(videos);
});

export const getVideos = cache(async ({ limit }: { limit?: number }) => {
  const videos = await db.query.videos.findMany({
    limit: limit,
    orderBy: (videos, { desc }) => [desc(videos.publishedAt)],
    with: {
      eventsVideos: {
        with: {
          event: {
            columns: { id: true, name: true, description: true },
          },
        },
      },
      videosSpeakers: {
        with: {
          user: {
            columns: { id: true, name: true, bio: true, image: true },
          },
        },
      },
    },
  });

  return videos;
});

export const getVideo = cache(async (id: number) => {
  const videos = await db.query.videos.findFirst({
    where: (videos, { eq }) => eq(videos.id, id),
    with: {
      eventsVideos: {
        with: {
          event: {
            columns: { id: true, name: true, description: true },
          },
        },
      },
      videosSpeakers: {
        with: {
          user: {
            columns: { id: true, name: true, bio: true, image: true },
          },
        },
      },
    },
  });

  return videos;
});
