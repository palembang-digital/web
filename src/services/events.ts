import { db } from "@/db";
import { cache } from "react";

export const getEvents = cache(async () => {
  const events = await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.scheduledStart)],
  });

  const upcomingEvents = events.filter(
    (event) => new Date(event.scheduledStart) >= new Date()
  );

  const pastEvents = events.filter(
    (event) => new Date(event.scheduledStart) < new Date()
  );

  return {
    events,
    upcomingEvents,
    pastEvents,
  };
});

export const getEvent = cache(async (id: number) => {
  const event = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.id, id),
    with: {
      eventsSpeakers: {
        with: {
          user: {
            columns: { id: true, name: true, username: true, image: true },
          },
        },
      },
      eventsHostsUsers: {
        with: {
          user: {
            columns: { id: true, name: true, username: true, image: true },
          },
        },
      },
      eventsHostsOrganizations: {
        with: {
          organization: {
            columns: { id: true, name: true, slug: true, image: true },
          },
        },
      },
      eventsVideos: {
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
    },
  });

  return event;
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
    },
  });

  return videos;
});

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
