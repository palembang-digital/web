import { auth } from "@/auth";
import EditEventForm from "@/components/events/edit-event-form";
import { FloatingHeader } from "@/components/floating-header";
import NotAuthenticated from "@/components/not-authenticated";
import { ScrollArea } from "@/components/scroll-area";
import { getEvent } from "@/services";

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  // @ts-ignore
  if (!session || session.user?.role !== "administrator") {
    return <NotAuthenticated />;
  }

  const event = await getEvent(params.id);

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
