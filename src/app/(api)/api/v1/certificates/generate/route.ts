import { db } from "@/db";
import { certificates } from "@/db/schema";
import { getEvents } from "@/services";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  const events = await getEvents({ limit: 1000 });

  const eventsWithSpeakers = events.filter(
    (event) => event.eventsSpeakers.length > 0
  );
  const eventsWithCommittees = events.filter(
    (event) => event.eventsCommittees.length > 0
  );

  let newCerts = [];

  for (const event of eventsWithSpeakers) {
    for (const eventSpeaker of event.eventsSpeakers) {
      newCerts.push({
        eventId: event.id,
        userId: eventSpeaker.user.id,
        role: "Pembicara",
      });
    }
  }

  for (const event of eventsWithCommittees) {
    for (const eventCommittee of event.eventsCommittees) {
      newCerts.push({
        eventId: event.id,
        userId: eventCommittee.user.id,
        role: "Panitia",
      });
    }
  }

  const certs = await db
    .insert(certificates)
    .values(newCerts)
    .onConflictDoUpdate({
      target: [certificates.eventId, certificates.userId, certificates.role],
      set: { role: sql.raw(`excluded.${certificates.role.name}`) },
    })
    .returning();

  return NextResponse.json({
    message: "Certificates generated",
    data: { certificates: certs },
  });
}
