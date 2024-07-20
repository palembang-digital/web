import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { TypographyH3, TypographyH4 } from "@/components/ui/typography";
import { db } from "@/db";
import Image from "next/image";

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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-1">
              <Image
                src={event?.imageUrl || ""}
                alt={event?.name || ""}
                width={300}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <div className="border border-slate-200 rounded-lg p-4">
                <TypographyH3>{event?.name}</TypographyH3>
              </div>
            </div>
            <div className="col-span-1">
              <TypographyH4>Speakers</TypographyH4>
              {event?.eventsSpeakers.map((speaker) => (
                <div key={speaker.user.id} className="flex items-center my-4">
                  <Image
                    src={speaker.user.image || ""}
                    alt={speaker.user.name || ""}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="ml-2">{speaker.user.name}</span>
                </div>
              ))}
              <TypographyH4>Hosts</TypographyH4>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
