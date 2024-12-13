import { TypographyH3 } from "@/components/ui/typography";
import { localeDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import EventLocationType from "./event-location-type";

export default function EventCard({ event }: { event: any }) {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="grid grid-cols-3 justify-between border rounded-md p-2 h-full bg-background hover:bg-accent shadow-sm">
        <div className="col-span-2 px-2 py-4">
          <h3 className="text-xs mb-2">
            {localeDate(new Date(event.scheduledStart))}
          </h3>
          <TypographyH3 className="text-sm">{event.name}</TypographyH3>
          {event.locationName && (
            <p className="text-xs mt-1">{event.locationName}</p>
          )}
          {event.locationType && (
            <EventLocationType type={event.locationType} className="mt-2" />
          )}
        </div>

        <div className="flex items-center">
          <Image
            src={event.imageUrl || ""}
            width={256}
            height={256}
            alt={event.name || ""}
            className="rounded-md object-cover aspect-square"
          />
        </div>
      </div>
    </Link>
  );
}
