import EventCard from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import Link from "next/link";
import AdUnit from "./ad-unit";

export default function PastEvents({
  events,
  showSeeMoreButton,
  showAds = false,
}: {
  events: any[];
  showSeeMoreButton?: boolean;
  showAds?: boolean;
}) {
  return (
    <div className="p-2 sm:p-6">
      <p className="italic text-neutral-400">Past events</p>
      <TypographyH2 className="text-neutral-800">
        Kegiatan sebelumnya
      </TypographyH2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((event, index) => (
          <>
            <EventCard key={event.id} event={event} />
            {showAds &&
              index > 0 &&
              index % Math.ceil(events.length / 8) === 0 && (
                <div key={index} className="border rounded-md p-2">
                  <AdUnit
                    format="fluid"
                    layoutKey="-gv+3t+5c-8s-m"
                    slot="3788208989"
                  />
                </div>
              )}
          </>
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
