import { db } from "@/db";
import { certificates } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const events = await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.scheduledStart)],
    with: {
      eventsSpeakers: {
        with: {
          user: {
            columns: { id: true, name: true, username: true, image: true },
          },
        },
      },
    },
  });

  const eventsWithSpeakers = events.filter(
    (event) => event.eventsSpeakers.length > 0
  );

  let newCerts = [];
  for (const event of eventsWithSpeakers) {
    for (const eventSpeaker of event.eventsSpeakers) {
      newCerts.push({
        eventId: event.id,
        userId: eventSpeaker.user.id,
      });
    }
  }

  const certs = await db
    .insert(certificates)
    .values(newCerts)
    .onConflictDoNothing()
    .returning();

  return NextResponse.json({
    message: "Certificates generated",
    data: { certificates: certs },
  });
}
