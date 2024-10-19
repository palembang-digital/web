import EventLocationType from "@/components/events/event-location-type";
import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLead,
} from "@/components/ui/typography";
import { getDay, localeDate, localeTimeFromString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function UpcomingEvents({ events }: { events: any[] }) {
  return (
    <div className="rounded-lg p-6 bg-neutral-900">
      <p className="italic text-neutral-400">Upcoming events</p>
      <TypographyH2 className="text-white">Kegiatan Patal</TypographyH2>

      <ol className="relative border-s border-dashed border-slate-400 mt-6">
        {events
          .sort((a, b) =>
            new Date(a.scheduledStart) > new Date(b.scheduledStart) ? 1 : -1
          )
          .map((event) => (
            <Link href={`/events/${event.id}`} key={event.id}>
              <li className="flex flex-col sm:flex-row gap-4 mt-6 ps-6 hover:bg-neutral-800">
                <div className="absolute w-3 h-3 bg-slate-400 rounded-full -start-[0.4rem] border border-slate-400"></div>

                <div className="flex-1 my-auto">
                  <div className="flex gap-2 items-center">
                    <TypographyH4 className=" text-neutral-50">
                      {localeDate(new Date(event.scheduledStart))}
                    </TypographyH4>
                    <p className="text-gray-500 text-base ">
                      {getDay(new Date(event.scheduledStart))}
                    </p>
                  </div>

                  <TypographyH3 className=" font-semibold text-neutral-50 mt-4">
                    {event.name}
                  </TypographyH3>

                  <TypographyLead className="text-base font-light text-gray-50 mt-2">
                    {event.locationName}
                  </TypographyLead>
                  <p className="text-base font-normal text-gray-500 mt-4">
                    {localeTimeFromString(event.scheduledStart)} -{" "}
                    {localeTimeFromString(event.scheduledEnd)}
                  </p>

                  <EventLocationType type={event.locationType} />
                </div>
                <div className="my-auto ">
                  <Image
                    className="object-cover rounded-lg border-2 border-white aspect-square m-5"
                    src={event.imageUrl}
                    width={200}
                    height={200}
                    alt={event.name}
                  />
                </div>
              </li>
            </Link>
          ))}
      </ol>
    </div>
  );
}
