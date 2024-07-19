import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { db } from "@/db";

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  const event = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.id, params.id),
    with: {
      eventsSpeakers: {
        with: {
          user: {
            columns: { id: true, name: true, username: true, image: true },
          },
        },
      },
      eventsVideos: {
        with: {
          video: {
            columns: { id: true, title: true, thumbnails: true },
          },
        },
      },
    },
  });

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle={event?.name} />
      <div className="content-wrapper">
        <div className="content">
          <p>{JSON.stringify(session)}</p>
          <p>{JSON.stringify(event)}</p>
        </div>
      </div>
    </ScrollArea>
  );
}
