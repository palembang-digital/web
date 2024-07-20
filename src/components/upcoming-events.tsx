import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/components/ui/typography";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

export default function UpcomingEvents({ events }: { events: any[] }) {
  return (
    <div className="rounded-lg p-6 bg-neutral-900">
      <TypographyH2 className="text-white">Kegiatan Patal</TypographyH2>
      <p className="italic text-neutral-400">Upcoming events</p>

      <ol className="relative border-s border-dashed border-slate-400 mt-6">
        {events.map((event) => (
          // TODO: #77 Create a new UpcomingEventCard component
          <Link href={`/events/${event.id}`} key={event.id}>
            <li className="flex flex-col sm:flex-row items-start gap-4 mb-6 ps-4 hover:bg-neutral-800">
              <div className="absolute w-3 h-3 bg-slate-400 rounded-full mt-1.5 -start-1.5 border border-slate-400"></div>
              <div className="flex-1">
                <TypographyH4 className="text-md text-neutral-50">
                  {DateTime.fromJSDate(event.scheduledStart)
                    .setLocale("id")
                    .toLocaleString(DateTime.DATE_FULL)}
                </TypographyH4>
                <TypographyH3 className="text-lg font-semibold text-neutral-50">
                  {event.name}
                </TypographyH3>
                <p className="text-base font-normal text-gray-500">
                  {event.description ||
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                </p>
              </div>
              <div>
                <Image
                  className="object-cover border-2 border-white"
                  src={event.imageUrl || ""}
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
