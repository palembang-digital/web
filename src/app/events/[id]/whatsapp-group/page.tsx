import { auth } from "@/auth";
import NotAuthenticated from "@/components/not-authenticated";
import { getEvent } from "@/services";
import { redirect } from "next/navigation";

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
  if (!session?.user) {
    return <NotAuthenticated />;
  }

  const event = await getEvent(params.id);
  if (!event) {
    return <p>Event not found</p>;
  }

  const isRegistered = isUserRegistered(event, session.user);
  if (!isRegistered) {
    redirect(`/events/${event.id}`);
  }

  if (!event.whatsappGroupUrl) {
    redirect(`/events/${event.id}`);
  }

  redirect(event.whatsappGroupUrl);
}
