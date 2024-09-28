import { db } from "@/db";
import { cache } from "react";

export const getEvents = cache(async () => {
  const events = await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.scheduledStart)],
    with: {
      eventsSpeakers: {
        with: {
          user: {
            columns: { id: true, name: true, username: true, image: true },
          },
        },
      },
      eventsCommittees: {
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

  return events;
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
      eventsAttendees: {
        with: {
          user: {
            columns: { id: true, name: true, username: true, image: true },
          },
        },
      },
      eventsCommittees: {
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
