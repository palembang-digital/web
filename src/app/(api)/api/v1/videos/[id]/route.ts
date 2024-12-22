import { auth } from "@/auth";
import { db } from "@/db";
import { eventsVideos, videos, videosSpeakers } from "@/db/schema";
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

  const currentVideo = await db.query.videos.findFirst({
    where: (videos, { eq }) => eq(videos.id, params.id),
    with: {
      videosSpeakers: true,
      eventsVideos: true,
    },
  });
  const currentSpeakers = currentVideo?.videosSpeakers;
  const currentEvents = currentVideo?.eventsVideos;

  const data = await req.json();

  const inputVideo = {
    ...data.video,
    publishedAt: new Date(data.video.publishedAt),
    createdAt: new Date(data.video.createdAt),
    updatedAt: new Date(data.video.updatedAt),
  };

  const inputSpeakers = data.speakers.map((speaker: any) => ({
    videoId: currentVideo?.id,
    userId: speaker.value,
  }));

  const inputEvents = data.events.map((event: any) => ({
    videoId: currentVideo?.id,
    eventId: event.value,
  }));

  const newSpeakers = inputSpeakers.filter(
    (inputSpeaker: any) =>
      !currentSpeakers?.some(
        (currentSpeaker) =>
          currentSpeaker.userId === inputSpeaker.userId &&
          currentSpeaker.videoId === inputSpeaker.videoId
      )
  );

  const deletedSpeakers = currentSpeakers?.filter(
    (currentSpeaker) =>
      !inputSpeakers.some(
        (inputSpeaker: any) =>
          currentSpeaker.userId === inputSpeaker.userId &&
          currentSpeaker.videoId === inputSpeaker.videoId
      )
  );

  const newEvents = inputEvents.filter(
    (inputEvent: any) =>
      !currentEvents?.some(
        (currentEvent) =>
          currentEvent.eventId === inputEvent.eventId &&
          currentEvent.videoId === inputEvent.videoId
      )
  );

  const deletedEvents = currentEvents?.filter(
    (currentEvent) =>
      !inputEvents.some(
        (inputEvent: any) =>
          currentEvent.eventId === inputEvent.eventId &&
          currentEvent.videoId === inputEvent.videoId
      )
  );

  await db.transaction(async (tx) => {
    await tx.update(videos).set(inputVideo).where(eq(videos.id, params.id));

    if (newSpeakers && newSpeakers.length > 0) {
      await tx.insert(videosSpeakers).values(newSpeakers);
    }
    if (deletedSpeakers && deletedSpeakers.length > 0) {
      deletedSpeakers.forEach(async (deletedSpeaker: any) => {
        await tx
          .delete(videosSpeakers)
          .where(
            and(
              eq(videosSpeakers.videoId, deletedSpeaker.videoId),
              eq(videosSpeakers.userId, deletedSpeaker.userId)
            )
          );
      });
    }

    if (newEvents && newEvents.length > 0) {
      await tx.insert(eventsVideos).values(newEvents);
    }
    if (deletedEvents && deletedEvents.length > 0) {
      deletedEvents.forEach(async (deletedEvent: any) => {
        await tx
          .delete(eventsVideos)
          .where(
            and(
              eq(eventsVideos.videoId, deletedEvent.videoId),
              eq(eventsVideos.eventId, deletedEvent.eventId)
            )
          );
      });
    }
  });

  const updatedVideo = await db.query.videos.findFirst({
    where: (videos, { eq }) => eq(videos.id, params.id),
    with: {
      videosSpeakers: true,
    },
  });

  return Response.json({
    message: "Video updated",
    data: updatedVideo,
  });
}
