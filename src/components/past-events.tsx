import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import Link from "next/link";

// TODO: #78 Implement past events component
export default function PastEvents({
  events,
  hideSeeMoreButton,
}: {
  events: any[];
  hideSeeMoreButton?: boolean;
}) {
  return (
    <div className="rounded-lg p-6 mt-16">
      <TypographyH2 className="text-neutral-800">
        Kegiatan sebelumnya
      </TypographyH2>
      <p className="italic text-neutral-400">Past events</p>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        {events.map((event) => (
          <Link key={`upcoming-event-${event.id}`} href={`/events/${event.id}`}>
            <TypographyH3 className="text-lg font-semibold text-neutral-800">
              {event.name}
            </TypographyH3>
          </Link>
        ))}
      </div>

      {!hideSeeMoreButton && (
        <Link href="/events">
          <Button variant="outline">Lihat semuanya</Button>
        </Link>
      )}
    </div>
  );
}
