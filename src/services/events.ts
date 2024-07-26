import { cache } from 'react';
import { db } from '@/db';

export const getEvents = cache(async () => {
  const events = await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.scheduledStart)],
  });

  const upcomingEvents = events.filter(
    (event) => new Date(event.scheduledStart) >= new Date(),
  );

  const pastEvents = events.filter(
    (event) => new Date(event.scheduledStart) < new Date(),
  );

  return {
    events,
    upcomingEvents,
    pastEvents,
  };
});
