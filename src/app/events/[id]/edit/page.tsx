import EditEventForm from "@//components/events/edit-event-form";
import { db } from "@//db";
import { auth } from "@/auth";

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  // @ts-ignore
  if (!session || session.user?.role !== "administrator") {
    return <p>Not authenticated</p>;
  }

  const event = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.id, params.id),
    with: {
      eventsSpeakers: true,
      eventsVideos: true,
    },
  });

  return <EditEventForm event={event} />;
}
