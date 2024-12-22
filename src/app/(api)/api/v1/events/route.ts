import { auth } from "@/auth";
import { db } from "@/db";
import {
  events,
  eventsCommittees,
  eventsHostsOrganizations,
  eventsHostsUsers,
  eventsSpeakers,
  eventsSponsorsOrganizations,
  eventsSponsorsUsers,
  eventsVideos,
} from "@/db/schema";
import { getEvents } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  const events = await getEvents({ limit: limit });

  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const data = await req.json();

  const inputEvent = {
    ...data.event,
    scheduledStart: new Date(data.event.scheduledStart),
    scheduledEnd: new Date(data.event.scheduledEnd),
  };

  await db.transaction(async (tx) => {
    const result = await tx.insert(events).values(inputEvent).returning();
    if (result.length === 0) {
      return Response.json(
        { message: "Failed to create event" },
        { status: 500 }
      );
    }

    const eventId = result[0].id;

    if (data.speakers && data.speakers.length > 0) {
      const speakers = data.speakers.map((speaker: any) => ({
        eventId: eventId,
        userId: speaker.value,
      }));
      await tx.insert(eventsSpeakers).values(speakers);
    }

    if (data.committees && data.committees.length > 0) {
      const committees = data.committees.map((committee: any) => ({
        eventId: eventId,
        userId: committee.value,
      }));
      await tx.insert(eventsCommittees).values(committees);
    }

    if (data.hostsOrganizations && data.hostsOrganizations.length > 0) {
      const hostsOrganizations = data.hostsOrganizations.map(
        (organization: any) => ({
          eventId: eventId,
          organizationId: organization.value,
        })
      );
      await tx.insert(eventsHostsOrganizations).values(hostsOrganizations);
    }

    if (data.hostsUsers && data.hostsUsers.length > 0) {
      const hostsUsers = data.hostsUsers.map((user: any) => ({
        eventId: eventId,
        userId: user.value,
      }));
      await tx.insert(eventsHostsUsers).values(hostsUsers);
    }

    if (data.sponsorsOrganizations && data.sponsorsOrganizations.length > 0) {
      const sponsorsOrganizations = data.sponsorsOrganizations.map(
        (organization: any) => ({
          eventId: eventId,
          organizationId: organization.value,
        })
      );
      await tx
        .insert(eventsSponsorsOrganizations)
        .values(sponsorsOrganizations);
    }

    if (data.sponsorsUsers && data.sponsorsUsers.length > 0) {
      const sponsorsUsers = data.sponsorsUsers.map((user: any) => ({
        eventId: eventId,
        userId: user.value,
      }));
      await tx.insert(eventsSponsorsUsers).values(sponsorsUsers);
    }

    if (data.videos && data.videos.length > 0) {
      const videos = data.videos.map((video: any) => ({
        eventId: eventId,
        videoId: video.value,
      }));
      await tx.insert(eventsVideos).values(videos);
    }
  });

  return Response.json({ message: "Event created" });
}
