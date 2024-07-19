import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  const events = await db.query.events.findMany({
    with: {
      eventsSpeakers: true,
      eventsVideos: true,
    },
    orderBy: (events, { desc }) => [desc(events.scheduledStart)],
  });

  return NextResponse.json(events);
}
