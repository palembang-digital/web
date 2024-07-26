import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import Link from "next/link";
import EventCard from "@/components/events/event-card";

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
      <p className="italic text-neutral-400">Past events</p>
      <TypographyH2 className="text-neutral-800">
        Kegiatan sebelumnya
      </TypographyH2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {!hideSeeMoreButton && (
        <Link href="/events">
          <Button variant="outline" className="mt-4">
            Lihat semuanya
          </Button>
        </Link>
      )}
    </div>
  );
}
