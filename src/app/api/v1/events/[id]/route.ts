import { auth } from "@/auth";
import { db } from "@/db";
import { events, eventsSpeakers } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function PUT(
  req: Request,
  { params }: { params: { id: number } }
) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  // @ts-ignore
  if (session?.user?.role !== "administrator") {
    return Response.json({ message: "Not authorized" }, { status: 403 });
  }

  const currentEvent = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.id, params.id),
    with: {
      eventsSpeakers: true,
      eventsVideos: true,
    },
  });

  const data = await req.json();

  const inputEvent = {
    ...data.event,
    scheduledStart: new Date(data.event.scheduledStart),
    scheduledEnd: new Date(data.event.scheduledEnd),
  };

  const inputSpeakers = data.speakers.map((speaker: any) => ({
    eventId: currentEvent?.id,
    userId: speaker.value,
  }));

  const currentSpeakers = currentEvent?.eventsSpeakers;

  const newSpeakers = inputSpeakers?.filter(
    (inputSpeaker: any) =>
      !currentSpeakers?.some(
        (currentSpeaker: any) =>
          currentSpeaker.eventId === inputSpeaker.eventId &&
          currentSpeaker.userId === inputSpeaker.userId
      )
  );

  const deletedSpeakers = currentSpeakers?.filter(
    (currentSpeaker) =>
      !inputSpeakers.some(
        (inputSpeaker: any) =>
          currentSpeaker.eventId === inputSpeaker.eventId &&
          currentSpeaker.userId === inputSpeaker.userId
      )
  );

  await db.transaction(async (tx) => {
    await tx.update(events).set(inputEvent).where(eq(events.id, params.id));
    if (newSpeakers && newSpeakers.length > 0) {
      await tx.insert(eventsSpeakers).values(newSpeakers);
    }
    if (deletedSpeakers && deletedSpeakers.length > 0) {
      deletedSpeakers.forEach(async (deletedSpeaker: any) => {
        await tx
          .delete(eventsSpeakers)
          .where(
            and(
              eq(eventsSpeakers.eventId, deletedSpeaker.eventId),
              eq(eventsSpeakers.userId, deletedSpeaker.userId)
            )
          );
      });
    }
  });

  const updatedEvent = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.id, params.id),
    with: {
      eventsSpeakers: true,
      eventsVideos: true,
    },
  });

  return Response.json({
    message: "Event updated",
    data: updatedEvent,
  });
}
