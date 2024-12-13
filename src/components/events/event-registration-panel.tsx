import EventRegistrationDialog from "@/components/events/event-registration-dialog";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toGCalDate } from "@/lib/utils";
import {
  CircleCheckBigIcon,
  LogInIcon,
  TicketIcon,
  TicketXIcon,
} from "lucide-react";
import Link from "next/link";

function isUserRegistered(event: any, user: any) {
  if (!user) {
    return false;
  }

  return event.eventsAttendees.some(
    (attendee: any) => attendee.user.id === user.id && attendee.rsvp === "yes"
  );
}

function isUserAttended(event: any, user: any) {
  if (!user) {
    return false;
  }

  return event.eventsAttendees.some(
    (attendee: any) => attendee.user.id === user.id && attendee.attended
  );
}

function UserAttendedPanel({ session, event }: { session: any; event: any }) {
  return (
    <div className="border border-slate-200 rounded-lg p-4 flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Avatar>
          <AvatarImage
            src={session?.user?.image || ""}
            alt={session?.user?.name || ""}
          />
          <AvatarFallback>{session?.user?.name || ""}</AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium">
          Hai {session?.user?.name}, terima kasih telah mengikuti kegiatan ini!
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          {event.feedbackUrl && (
            <Link href={event.feedbackUrl} target="_blank">
              <Button className="text-xs" variant="outline">
                Berikan feedback
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EventRegistrationPanel({
  session,
  event,
}: {
  session: any;
  event: any;
}) {
  const isAttended = isUserAttended(event, session?.user);
  if (isAttended) {
    return <UserAttendedPanel session={session} event={event} />;
  }

  if (event.scheduledEnd < new Date()) {
    return (
      <Button className="text-xs bg-green-600 hover:bg-green-600 hover:cursor-default">
        <CircleCheckBigIcon className="mr-2 h-3 w-3" /> Kegiatan ini telah
        berakhir
      </Button>
    );
  }

  const isRegistered = isUserRegistered(event, session?.user);
  if (isRegistered) {
    return (
      <div className="border border-slate-200 rounded-lg p-4 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Avatar>
            <AvatarImage
              src={session?.user?.image || ""}
              alt={session?.user?.name || ""}
            />
            <AvatarFallback>{session?.user?.name || ""}</AvatarFallback>
          </Avatar>
          <p className="text-md font-medium">
            Hai {session?.user?.name}, kamu telah terdaftar!
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            {event.whatsappGroupUrl && (
              <Link href={event.whatsappGroupUrl} target="_blank">
                <Button className="text-xs bg-green-600 hover:bg-green-700">
                  Gabung ke grup WhatsApp <LogInIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
            <Link
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${
                event.name
              }&dates=${toGCalDate(event.scheduledStart)}/${toGCalDate(
                event.scheduledEnd
              )}&details=${event.description}&ctz=Asia/Jakarta&location=${
                event.locationName
              }`}
              target="_blank"
            >
              <Button className="text-xs" variant="outline">
                Tambahkan ke Google Calendar
              </Button>
            </Link>
          </div>
          <EventRegistrationDialog
            event={event}
            user={session?.user}
            actionType="update"
          />
        </div>
      </div>
    );
  }

  const totalAttendees = event.eventsAttendees.filter(
    (a: any) => a.rsvp === "yes"
  ).length;
  if (totalAttendees >= event.attendeeLimit) {
    return (
      <Button className="text-xs bg-red-500 hover:bg-red-500 hover:cursor-default">
        <TicketXIcon className="mr-2 h-3 w-3" /> Kuota penuh
      </Button>
    );
  }

  if (event.registrationUrlType === "internal") {
    return (
      <EventRegistrationDialog
        event={event}
        user={session?.user}
        actionType="register"
      />
    );
  } else if (event.registrationUrl) {
    return (
      <Link
        href={
          event.registrationUrlType === "internal"
            ? `/events/${event.id}/register`
            : event.registrationUrl || ""
        }
        className="w-full"
      >
        <ShimmerButton>
          <TicketIcon className="mr-2 h-4 w-4" />
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
            Daftar sekarang!
          </span>
        </ShimmerButton>
      </Link>
    );
  }

  return null;
}
