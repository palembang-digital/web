import EventsGrid from "@/components/events/events-grid";
import { db } from "@/db";

export default async function Page() {
  const events = await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.scheduledStart)],
  });

  return <EventsGrid events={events} />;
}
