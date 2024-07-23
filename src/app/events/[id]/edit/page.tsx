import { auth } from "@/auth";
import EditEventForm from "@/components/events/edit-event-form";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { db } from "@/db";

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  // @ts-ignore
  if (!session || session.user?.role !== "administrator") {
    return <p>Not authenticated</p>;
  }

  const event = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.id, params.id),
    with: {
      eventsSpeakers: {
        with: {
          user: true,
        },
      },
      eventsHostsUsers: {
        with: {
          user: true,
        },
      },
      eventsHostsOrganizations: {
        with: {
          organization: true,
        },
      },
      eventsVideos: {
        with: {
          video: true,
        },
      },
    },
  });

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle={event?.name} />
      <div className="content-wrapper">
        <div className="content">
          <EditEventForm event={event} />
        </div>
      </div>
    </ScrollArea>
  );
}
