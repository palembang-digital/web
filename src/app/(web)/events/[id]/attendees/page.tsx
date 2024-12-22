import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import NotAuthenticated from "@/components/not-authenticated";
import { ScrollArea } from "@/components/scroll-area";
import { TypographyH4 } from "@/components/ui/typography";
import { localeDate } from "@/lib/utils";
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
      title: `Peserta ${event.name} · Palembang Digital`,
      description: `Peserta kegiatan ${
        event.name
      } yang akan diselenggarakan pada ${localeDate(event.scheduledStart)}`,
      images: `/events/${params.id}/og.png`,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();
  if (!session) {
    return <NotAuthenticated />;
  }

  // @ts-ignore
  const isAdmin = session.user?.role === "administrator";

  const event = await getEvent(params.id);
  if (!event) {
    return <p>Event not found</p>;
  }

  const isCommittee = event.eventsCommittees.some(
    (committee: any) => committee.userId === session?.user?.id
  );

  const attendees = event.eventsAttendees
    .filter((attendee: any) => attendee.rsvp === "yes")
    .sort((a: any, b: any) => a.user.name.localeCompare(b.user.name))
    .map((attendee: any) => ({
      ...attendee.user,
      rsvp: attendee.rsvp,
      attended: attendee.attended,
      canUpdateAttendance: isAdmin || isCommittee,
      eventId: event.id,
    }));

  const totalAttended = attendees.filter((attendee: any) => attendee.attended);

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle={event.name} />
      <div className="content-wrapper">
        <div className="content">
          <div className="flex flex-col gap-4">
            <TypographyH4>
              Peserta Kegiatan{" "}
              <Link href={`/events/${event.id}`} className="hover:underline">
                {event.name}
              </Link>
            </TypographyH4>
            <div className="flex flex-col gap-2 text-xs">
              <p>
                Total RSVP: {attendees.length}, total hadir:{" "}
                {totalAttended.length} (
                {Math.round((totalAttended.length / attendees.length) * 100)}%)
              </p>
            </div>
            <DataTable columns={columns} data={attendees} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
