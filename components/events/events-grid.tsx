import EventCard from "@/components/events/event-card";
import Link from "next/link";

function EventsGrid({
  events,
  start,
  end,
}: {
  events: any[];
  start?: number;
  end?: number;
}) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {events
        .sort(
          (a, b) =>
            Date.now() -
            new Date(a.scheduledStart).getTime() -
            (Date.now() - new Date(b.scheduledStart).getTime())
        )
        .slice(start, end)
        .map((event, idx) => (
          <div key={idx} className="flex items-center justify-center">
            <Link href={`/events/${event.id}`}>
              <EventCard event={event} />
            </Link>
          </div>
        ))}
    </div>
  );
}

export default EventsGrid;
