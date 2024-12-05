import { auth } from "@/auth";
import { db } from "@/db";
import { eventsDiscussions } from "@/db/schema";
import { getEvent } from "@/services";
import { getEventDiscussions } from "@/services/event-discussions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const eventId = params.id;
  const feeds = await getEventDiscussions(eventId);

  return NextResponse.json(feeds);
}

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

  const discssusionId: number = await db.transaction(async (tx) => {
    const result = await tx
      .insert(eventsDiscussions)
      .values({
        eventId: event.id,
        userId: data.user.id,
        content: data.content,
        parentId: data.parentId ? data.parentId : null,
      })
      .returning();
    if (result.length === 0) {
      return -1;
    }
    return result[0].id;
  });

  if (discssusionId === -1) {
    return Response.json(
      { message: "Failed to create a new discussion" },
      { status: 500 }
    );
  }

  return Response.json({ message: "Discussion posted" });
}
