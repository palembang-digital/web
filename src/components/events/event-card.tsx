import { Badge } from "@/components//ui/badge";
import { TypographyH3 } from "@/components/ui/typography";
import { localeDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function EventCard({ event }: { event: any }) {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="grid grid-cols-3 justify-between border rounded-md p-2 h-full hover:bg-neutral-100 hover:border-neutral-100">
        <div className="col-span-2 px-2 py-4">
          <h3 className="text-xs mb-2">
            {localeDate(new Date(event.scheduledStart))}
          </h3>
          <TypographyH3 className="text-sm">{event.name}</TypographyH3>
          {event.locationName && (
            <p className="text-xs">{event.locationName}</p>
          )}
          {event.locationType && (
            <Badge variant="secondary" className="mt-2">
              {event.locationType}
            </Badge>
          )}
        </div>

        <div className="">
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