import { auth } from "@/auth";
import EventList from "@/components/events/event-list";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kegiatan",
};

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Page() {
  const session = await auth();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Kegiatan Patal" />
      <div className="content-wrapper">
        <div className="content">
          <EventList />
        </div>
      </div>
    </ScrollArea>
  );
}
