import { db } from "@/db";
import { cache } from "react";

export const getUser = cache(async (username: string) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
    with: {
      eventsSpeakers: {
        with: {
          event: {
            columns: {
              id: true,
              name: true,
              imageUrl: true,
              scheduledStart: true,
            },
          },
        },
      },
      videosSpeakers: {
        with: {
          video: {
            columns: {
              id: true,
              title: true,
              videoType: true,
              videoUrl: true,
              thumbnails: true,
              publishedAt: true,
            },
          },
        },
      },
      certificates: {
        with: {
          event: {
            columns: {
              name: true,
              scheduledStart: true,
              scheduledEnd: true,
            },
          },
        },
      },
    },
  });

  return user;
});
