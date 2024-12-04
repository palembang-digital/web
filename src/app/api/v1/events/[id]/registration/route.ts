import { auth } from "@/auth";
import { db } from "@/db";
import { eventsAttendees } from "@/db/schema";
import { getEvent } from "@/services";
import { tasks } from "@trigger.dev/sdk/v3";

export async function POST(
  req: Request,
  { params }: { params: { id: number } }
) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const data = await req.json();

  if (data.user.id !== session.user.id) {
    return Response.json({ message: "Not authorized" }, { status: 403 });
  }

  const event = await getEvent(params.id);
  if (!event) {
    return Response.json({ message: "Event not found" }, { status: 404 });
  }

  const totalAttendees = event.eventsAttendees.filter(
    (a: any) => a.rsvp === "yes"
  ).length;

  if (
    data.rsvp === "yes" &&
    event.attendeeLimit &&
    totalAttendees >= event.attendeeLimit
  ) {
    return Response.json({ message: "Kuota sudah penuh" }, { status: 400 });
  }

  await db.transaction(async (tx) => {
    await tx
      .insert(eventsAttendees)
      .values({
        eventId: event.id,
        userId: data.user.id,
        rsvp: data.rsvp,
      })
      .onConflictDoUpdate({
        target: [eventsAttendees.eventId, eventsAttendees.userId],
        set: { rsvp: data.rsvp },
      });
  });

  if (data.rsvp === "yes") {
    await tasks.trigger("send-email", {
      to: session.user.email,
      subject: `Konfirmasi pendaftaran ${event.name}`,
      body: {
        event: event,
        user: session.user,
      },
      emailTemplate: "event-registration",
    });
  }

  return Response.json({ message: "Registration created" });
}
