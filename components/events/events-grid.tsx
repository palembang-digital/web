import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { events as eventsSchema } from "@/db/schema/events";
import { InferSelectModel } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

function EventsGrid({
  events,
  start,
  end,
}: {
  events: InferSelectModel<typeof eventsSchema>[];
  start?: number;
  end?: number;
}) {
  return (
    <div className="flex gap-6">
      {events
        .sort(
          (a, b) =>
            Date.now() -
            new Date(a.scheduledStart).getTime() -
            (Date.now() - new Date(b.scheduledStart).getTime())
        )
        .slice(start, end)
        .map((event, idx) => (
          <Link key={idx} href={`/events/${event.id}`}>
            <Card className="w-[200px]">
              <CardHeader>
                <Image
                  className="object-cover "
                  src={event.imageUrl || ""}
                  width={200}
                  height={200}
                  alt={event.name}
                />
              </CardHeader>
              <CardContent className="text-muted-foreground flex flex-col text-sm">
                {/* <p>{FormatDateEvent(event.scheduledEnd)}</p> */}
                <p className="truncate text-lg font-bold text-black">
                  {event.name}
                </p>
                <p>tempat</p>
              </CardContent>
            </Card>
          </Link>
        ))}
    </div>
  );
}

export default EventsGrid;
