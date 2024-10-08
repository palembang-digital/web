import EventCard from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import Link from "next/link";

export default function PastEvents({
  events,
  showSeeMoreButton,
}: {
  events: any[];
  showSeeMoreButton?: boolean;
}) {
  return (
    <div className="p-6">
      <p className="italic text-neutral-400">Past events</p>
      <TypographyH2 className="text-neutral-800">
        Kegiatan sebelumnya
      </TypographyH2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {showSeeMoreButton && (
        <Link href="/events">
          <Button variant="outline" className="mt-4 text-xs">
            Lihat semua kegiatan
          </Button>
        </Link>
      )}
    </div>
  );
}
