import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { TypographyH2, TypographyH4 } from "@/components/ui/typography";
import { getDate, getMonthYear, localeDate, localeTime } from "@/lib/utils";
import { getEvent } from "@/services";
import type { Metadata } from "next";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const event = await getEvent(params.id);
  if (!event) {
    return {
      title: "Event not found",
    };
  }

  return {
    title: event.name,
    openGraph: {
      title: `${event.name} · Palembang Digital`,
      description: `Peserta kegiatan ${
        event.name
      } yang akan diselenggarakan pada ${localeDate(event.scheduledStart)}`,
      images: `/events/${params.id}/og.png`,
      type: "article",
    },
  };
}

function EventSchedule({ event }: { event: any }) {
  return (
    <div className="flex flex-row gap-3 items-center">
      <div>
        <p className="font-semibold text-xs text-white bg-black rounded-t-md p-2">
          {getMonthYear(event.scheduledStart)}
        </p>
        <TypographyH2 className="rounded-b-md p-2 border border-t-0 text-md text-center">
          {getDate(event.scheduledStart)}
        </TypographyH2>
      </div>

      <div>
        {localeDate(event.scheduledStart) !== localeDate(event.scheduledEnd) ? (
          <>
            <TypographyH2 className="text-md pb-0">
              {localeDate(event.scheduledStart)}
            </TypographyH2>
            <p className="text-xs text-neutral-500">
              {localeTime(event.scheduledStart)}
            </p>
          </>
        ) : (
          <TypographyH2 className="text-md pb-0">
            {localeTime(event.scheduledStart)}
          </TypographyH2>
        )}
      </div>

      {event.scheduledEnd && (
        <>
          <div>
            <p className="text-xs text-neutral-500">s/d</p>
          </div>
          <div>
            {localeDate(event.scheduledStart) !==
            localeDate(event.scheduledEnd) ? (
              <>
                <TypographyH2 className="text-md pb-0">
                  {localeDate(event.scheduledEnd)}
                </TypographyH2>
                <p className="text-xs text-neutral-500">
                  {localeTime(event.scheduledEnd)}
                </p>
              </>
            ) : (
              <TypographyH2 className="text-md pb-0">
                {localeTime(event.scheduledEnd)}
              </TypographyH2>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function isUserRegistered(event: any, user: any) {
  if (!user) {
    return false;
  }

  return event.eventsAttendees.some(
    (attendee: any) => attendee.user.id === user.id && attendee.rsvp === "yes"
  );
}

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  const event = await getEvent(params.id);
  if (!event) {
    return <p>Event not found</p>;
  }

  const attendees = event.eventsAttendees
    .filter((attendee: any) => attendee.rsvp === "yes")
    .sort((a: any, b: any) => a.user.name.localeCompare(b.user.name))
    .map((attendee: any) => attendee.user);

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle={event.name} />
      <div className="content-wrapper">
        <div className="content">
          <div className="flex flex-col gap-4">
            <TypographyH4>
              Peserta kegiatan{" "}
              <Link href={`/events/${event.id}`}>{event.name}</Link>
            </TypographyH4>
            <DataTable columns={columns} data={attendees} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
