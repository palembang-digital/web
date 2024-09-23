import { db } from "@/db";
import { cache } from "react";

export const getVideos = cache(async () => {
  const videos = await db.query.videos.findMany({
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
