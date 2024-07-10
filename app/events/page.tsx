import EventsGrid from "@/components/events/events-grid";
import { db } from "@/db";

export default async function Page() {
  const events = await db.query.events.findMany();

  return <EventsGrid events={events} />;
}
