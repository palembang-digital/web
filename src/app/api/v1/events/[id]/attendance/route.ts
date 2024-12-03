import { auth } from "@/auth";
import { db } from "@/db";
import { eventsAttendees } from "@/db/schema";
import { getEvent } from "@/services";

export async function POST(
  req: Request,
  { params }: { params: { id: number } }
) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const data = await req.json();

  const event = await getEvent(params.id);
  if (!event) {
    return Response.json({ message: "Event not found" }, { status: 404 });
  }

  // @ts-ignore
  const isAdmin = session.user?.role === "administrator";
  const isCommittee = event.eventsCommittees.some(
    (committee: any) => committee.userId === session?.user?.id
  );

  if (!isAdmin && !isCommittee) {
    return Response.json({ message: "Not authorized" }, { status: 403 });
  }

  await db.transaction(async (tx) => {
    await tx
      .insert(eventsAttendees)
      .values({
        eventId: event.id,
        userId: data.user.id,
        rsvp: data.rsvp,
        attended: data.attended,
      })
      .onConflictDoUpdate({
        target: [eventsAttendees.eventId, eventsAttendees.userId],
        set: { rsvp: data.rsvp, attended: data.attended },
      });
  });

  return Response.json({ message: "Attendance updated" });
}
