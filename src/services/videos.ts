import { db } from "@/db";
import { cache } from "react";

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
    },
  });

  return videos;
});
