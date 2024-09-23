import { auth } from "@/auth";
import NewEventForm from "@/components/events/new-event-form";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";

export default async function Page() {
  const session = await auth();

  // @ts-ignore
  if (!session || session.user?.role !== "administrator") {
    return <p>Not authenticated</p>;
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="New event" />
      <div className="content-wrapper">
        <div className="content">
          <NewEventForm />
        </div>
      </div>
    </ScrollArea>
  );
}
