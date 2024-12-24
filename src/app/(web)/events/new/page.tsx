import { auth } from "@/auth";
import NewEventForm from "@/components/events/new-event-form";
import { FloatingHeader } from "@/components/floating-header";
import NotAuthenticated from "@/components/not-authenticated";
import { ScrollArea } from "@/components/scroll-area";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Buat Kegiatan Baru",
  };
}

export default async function Page() {
  const session = await auth();

  // @ts-ignore
  if (!session || session.user?.role !== "administrator") {
    return <NotAuthenticated />;
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
