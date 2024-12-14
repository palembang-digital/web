import { db } from "@/db";
import { events } from "@/db/schema";
import { count } from "drizzle-orm";
import { cache } from "react";

export const getEventsCount = cache(async () => {
  return await db.select({ count: count() }).from(events);
});

export const getEvents = cache(
  async ({ where, limit = 1000 }: { where?: any; limit?: number }) => {
    const events = await db.query.events.findMany({
      where: where,
      limit: limit,
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
        eventsPhotos: {
          with: {
            photo: {
              columns: {
                id: true,
                imageUrl: true,
                caption: true,
              },
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
  }
);

export const getUpcomingEvents = cache(
  async ({ limit }: { limit?: number }) => {
    return getEvents({
      where: (events: { scheduledStart: any }, { gt }: any) =>
        gt(events.scheduledStart, new Date()),
      limit: limit,
    });
  }
);

export const getPastEvents = cache(async ({ limit }: { limit?: number }) => {
  return getEvents({
    where: (events: { scheduledStart: any }, { lt }: any) =>
      lt(events.scheduledStart, new Date()),
    limit: limit,
  });
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
      eventsSponsorsUsers: {
        with: {
          user: {
            columns: { id: true, name: true, username: true, image: true },
          },
        },
      },
      eventsSponsorsOrganizations: {
        with: {
          organization: {
            columns: { id: true, name: true, slug: true, image: true },
          },
        },
      },
      eventsPhotos: {
        with: {
          photo: {
            columns: {
              id: true,
              imageUrl: true,
              caption: true,
              createdAt: true,
            },
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
