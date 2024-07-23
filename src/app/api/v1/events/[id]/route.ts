import { auth } from "@/auth";
import { db } from "@/db";
import {
  events,
  eventsHostsOrganizations,
  eventsHostsUsers,
  eventsSpeakers,
  eventsVideos,
} from "@/db/schema";
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
      eventsHostsOrganizations: true,
      eventsHostsUsers: true,
      eventsVideos: true,
    },
  });
  const currentSpeakers = currentEvent?.eventsSpeakers;
  const currentHostsOrganizations = currentEvent?.eventsHostsOrganizations;
  const currentHostsUsers = currentEvent?.eventsHostsUsers;
  const currentVideos = currentEvent?.eventsVideos;

  const data = await req.json();
  console.log("data", data);

  const inputEvent = {
    ...data.event,
    scheduledStart: new Date(data.event.scheduledStart),
    scheduledEnd: new Date(data.event.scheduledEnd),
  };

  const inputSpeakers = data.speakers.map((speaker: any) => ({
    eventId: currentEvent?.id,
    userId: speaker.value,
  }));

  const inputHostsOrganizations = data.hostsOrganizations.map(
    (organization: any) => ({
      eventId: currentEvent?.id,
      organizationId: organization.value,
    })
  );

  const inputHostsUsers = data.hostsUsers.map((user: any) => ({
    eventId: currentEvent?.id,
    userId: user.value,
  }));

  const inputVideos = data.videos.map((video: any) => ({
    eventId: currentEvent?.id,
    videoId: video.value,
  }));

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

  const newHostsOrganizations = inputHostsOrganizations?.filter(
    (inputHostOrganization: any) =>
      !currentHostsOrganizations?.some(
        (currentHostOrganization: any) =>
          currentHostOrganization.eventId === inputHostOrganization.eventId &&
          currentHostOrganization.organizationId ===
            inputHostOrganization.organizationId
      )
  );

  const deletedHostsOrganizations = currentHostsOrganizations?.filter(
    (currentHostOrganization) =>
      !inputHostsOrganizations.some(
        (inputHostOrganization: any) =>
          currentHostOrganization.eventId === inputHostOrganization.eventId &&
          currentHostOrganization.organizationId ===
            inputHostOrganization.organizationId
      )
  );

  const newHostsUsers = inputHostsUsers?.filter(
    (inputHostUser: any) =>
      !currentHostsUsers?.some(
        (currentHostUser: any) =>
          currentHostUser.eventId === inputHostUser.eventId &&
          currentHostUser.userId === inputHostUser.userId
      )
  );

  const deletedHostsUsers = currentHostsUsers?.filter(
    (currentHostUser) =>
      !inputHostsUsers.some(
        (inputHostUser: any) =>
          currentHostUser.eventId === inputHostUser.eventId &&
          currentHostUser.userId === inputHostUser.userId
      )
  );

  const newVideos = inputVideos?.filter(
    (inputVideo: any) =>
      !currentVideos?.some(
        (currentVideo: any) =>
          currentVideo.eventId === inputVideo.eventId &&
          currentVideo.videoId === inputVideo.videoId
      )
  );

  const deletedVideos = currentVideos?.filter(
    (currentVideo) =>
      !inputVideos.some(
        (inputVideo: any) =>
          currentVideo.eventId === inputVideo.eventId &&
          currentVideo.videoId === inputVideo.videoId
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

    if (newHostsOrganizations && newHostsOrganizations.length > 0) {
      await tx.insert(eventsHostsOrganizations).values(newHostsOrganizations);
    }
    if (deletedHostsOrganizations && deletedHostsOrganizations.length > 0) {
      deletedHostsOrganizations.forEach(
        async (deletedHostOrganization: any) => {
          await tx
            .delete(eventsHostsOrganizations)
            .where(
              and(
                eq(
                  eventsHostsOrganizations.eventId,
                  deletedHostOrganization.eventId
                ),
                eq(
                  eventsHostsOrganizations.organizationId,
                  deletedHostOrganization.organizationId
                )
              )
            );
        }
      );
    }

    if (newHostsUsers && newHostsUsers.length > 0) {
      await tx.insert(eventsHostsUsers).values(newHostsUsers);
    }
    if (deletedHostsUsers && deletedHostsUsers.length > 0) {
      deletedHostsUsers.forEach(async (deletedHostUser: any) => {
        await tx
          .delete(eventsHostsUsers)
          .where(
            and(
              eq(eventsHostsUsers.eventId, deletedHostUser.eventId),
              eq(eventsHostsUsers.userId, deletedHostUser.userId)
            )
          );
      });
    }

    if (newVideos && newVideos.length > 0) {
      await tx.insert(eventsVideos).values(newVideos);
    }
    if (deletedVideos && deletedVideos.length > 0) {
      deletedVideos.forEach(async (deletedVideo: any) => {
        await tx
          .delete(eventsVideos)
          .where(
            and(
              eq(eventsVideos.eventId, deletedVideo.eventId),
              eq(eventsVideos.videoId, deletedVideo.videoId)
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
