import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLead,
} from "@/components/ui/typography";
import { Badge } from "@/components//ui/badge";
import { getDate, localeDate, localeTime, getDay } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function UpcomingEvents({ events }: { events: any[] }) {
  return (
    <div className="rounded-lg p-6 bg-neutral-900">
      <TypographyH2 className="text-white">Kegiatan Patal</TypographyH2>
      <p className=" text-neutral-400">Event dalam waktu dekat</p>

      <ol className="relative border-s border-dashed border-slate-400 mt-6">
        {events.map((event) => (
          // TODO: #77 Create a new UpcomingEventCard component
          <Link href={`/events/${event.id}`} key={event.id}>
            <li className="flex flex-col sm:flex-row items-start gap-4 mt-6 ps-6 hover:bg-neutral-800">
              <div className="absolute w-3 h-3 bg-slate-400 rounded-full  -start-[0.4rem] border border-slate-400"></div>

              <div className="flex-1 my-auto">
                <div className="flex gap-2 items-end">
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
                  {localeTime(new Date(event.scheduledStart))} -{" "}
                  {localeTime(new Date(event.scheduledEnd))}
                </p>

                <Badge
                  variant="outline"
                  className="mt-2 text-base text-pink-500 bg-pink-100 rounded-sm px-1"
                >
                  {event.locationType || "offline"}
                </Badge>
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
