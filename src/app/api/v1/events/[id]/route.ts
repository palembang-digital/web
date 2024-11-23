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
import { getEvent } from "@/services";
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

  const currentEvent = await getEvent(params.id);
  const currentSpeakers = currentEvent?.eventsSpeakers;
  const currentCommittees = currentEvent?.eventsCommittees;
  const currentHostsOrganizations = currentEvent?.eventsHostsOrganizations;
  const currentHostsUsers = currentEvent?.eventsHostsUsers;
  const currentSponsorsOrganizations =
    currentEvent?.eventsSponsorsOrganizations;
  const currentSponsorsUsers = currentEvent?.eventsSponsorsUsers;
  const currentVideos = currentEvent?.eventsVideos;

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

  const inputCommittees = data.committees.map((committee: any) => ({
    eventId: currentEvent?.id,
    userId: committee.value,
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

  const inputSponsorsOrganizations = data.sponsorsOrganizations.map(
    (organization: any) => ({
      eventId: currentEvent?.id,
      organizationId: organization.value,
    })
  );

  const inputSponsorsUsers = data.sponsorsUsers.map((user: any) => ({
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

  const newCommittees = inputCommittees?.filter(
    (inputCommittee: any) =>
      !currentCommittees?.some(
        (currentCommittee: any) =>
          currentCommittee.eventId === inputCommittee.eventId &&
          currentCommittee.userId === inputCommittee.userId
      )
  );

  const deletedCommittees = currentCommittees?.filter(
    (currentCommittee) =>
      !inputCommittees.some(
        (inputCommittee: any) =>
          currentCommittee.eventId === inputCommittee.eventId &&
          currentCommittee.userId === inputCommittee.userId
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

  const newSponsorsOrganizations = inputSponsorsOrganizations?.filter(
    (inputSponsorOrganization: any) =>
      !currentSponsorsOrganizations?.some(
        (currentSponsorOrganization: any) =>
          currentSponsorOrganization.eventId ===
            inputSponsorOrganization.eventId &&
          currentSponsorOrganization.organizationId ===
            inputSponsorOrganization.organizationId
      )
  );

  const deletedSponsorsOrganizations = currentSponsorsOrganizations?.filter(
    (currentSponsorOrganization) =>
      !inputSponsorsOrganizations.some(
        (inputSponsorOrganization: any) =>
          currentSponsorOrganization.eventId ===
            inputSponsorOrganization.eventId &&
          currentSponsorOrganization.organizationId ===
            inputSponsorOrganization.organizationId
      )
  );

  const newSponsorsUsers = inputSponsorsUsers?.filter(
    (inputSponsorUser: any) =>
      !currentSponsorsUsers?.some(
        (currentSponsorUser: any) =>
          currentSponsorUser.eventId === inputSponsorUser.eventId &&
          currentSponsorUser.userId === inputSponsorUser.userId
      )
  );

  const deletedSponsorsUsers = currentSponsorsUsers?.filter(
    (currentSponsorUser) =>
      !inputSponsorsUsers.some(
        (inputSponsorUser: any) =>
          currentSponsorUser.eventId === inputSponsorUser.eventId &&
          currentSponsorUser.userId === inputSponsorUser.userId
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

    if (newCommittees && newCommittees.length > 0) {
      await tx.insert(eventsCommittees).values(newCommittees);
    }
    if (deletedCommittees && deletedCommittees.length > 0) {
      deletedCommittees.forEach(async (deletedCommittee: any) => {
        await tx
          .delete(eventsCommittees)
          .where(
            and(
              eq(eventsCommittees.eventId, deletedCommittee.eventId),
              eq(eventsCommittees.userId, deletedCommittee.userId)
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

    if (newSponsorsOrganizations && newSponsorsOrganizations.length > 0) {
      await tx
        .insert(eventsSponsorsOrganizations)
        .values(newSponsorsOrganizations);
    }
    if (
      deletedSponsorsOrganizations &&
      deletedSponsorsOrganizations.length > 0
    ) {
      deletedSponsorsOrganizations.forEach(
        async (deletedSponsorOrganization: any) => {
          await tx
            .delete(eventsSponsorsOrganizations)
            .where(
              and(
                eq(
                  eventsSponsorsOrganizations.eventId,
                  deletedSponsorOrganization.eventId
                ),
                eq(
                  eventsSponsorsOrganizations.organizationId,
                  deletedSponsorOrganization.organizationId
                )
              )
            );
        }
      );
    }

    if (newSponsorsUsers && newSponsorsUsers.length > 0) {
      await tx.insert(eventsSponsorsUsers).values(newSponsorsUsers);
    }
    if (deletedSponsorsUsers && deletedSponsorsUsers.length > 0) {
      deletedSponsorsUsers.forEach(async (deletedSponsorUser: any) => {
        await tx
          .delete(eventsSponsorsUsers)
          .where(
            and(
              eq(eventsSponsorsUsers.eventId, deletedSponsorUser.eventId),
              eq(eventsSponsorsUsers.userId, deletedSponsorUser.userId)
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

  const updatedEvent = await getEvent(params.id);

  return Response.json({
    message: "Event updated",
    data: updatedEvent,
  });
}
