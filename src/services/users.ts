import { db } from "@/db";
import { users } from "@/db/schema";
import { count } from "drizzle-orm";
import { cache } from "react";

export const getUsersCount = cache(async () => {
  return await db.select({ count: count() }).from(users);
});

export const getUsers = cache(async () => {
  const users = await db.query.users.findMany({
    orderBy: (users, { asc }) => [asc(users.name)],
    with: {
      eventsSpeakers: {
        with: {
          event: {
            columns: {
              id: true,
              name: true,
              imageUrl: true,
              scheduledStart: true,
              locationType: true,
            },
          },
        },
      },
      eventsCommittees: {
        with: {
          event: {
            columns: {
              id: true,
              name: true,
              imageUrl: true,
              scheduledStart: true,
              locationType: true,
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

  return users;
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
              locationType: true,
            },
          },
        },
      },
      eventsCommittees: {
        with: {
          event: {
            columns: {
              id: true,
              name: true,
              imageUrl: true,
              scheduledStart: true,
              locationType: true,
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
              id: true,
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

export const mergeUserEvents = (user: any) => {
  const eventsAsSpeaker = user.eventsSpeakers.map(
    (eventSpeaker: any) => eventSpeaker.event
  );

  const eventsAsCommittee = user.eventsCommittees.map(
    (eventCommittee: any) => eventCommittee.event
  );

  const events = [...eventsAsSpeaker, ...eventsAsCommittee].filter(
    (event: any, index: number, self: any[]) =>
      index === self.findIndex((t) => t.id === event.id)
  );

  return events.sort((a, b) => (a.scheduledStart < b.scheduledStart ? 1 : -1));
};
