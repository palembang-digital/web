import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { TypographyH4 } from "@/components/ui/typography";
import YouTubeVideoCard from "@/components/youtube-video-card";
import { getEvent } from "@/services";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  const event = await getEvent(params.id);
  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader
        session={session}
        scrollTitle={`Dokumentasi Kegiatan ${event.name}`}
      />
      <div className="content-wrapper">
        <div className="content">
          <div className="flex flex-col gap-2">
            <TypographyH4>
              Dokumentasi Kegiatan{" "}
              <Link href={`/events/${event.id}`} className="hover:underline">
                {event.name}
              </Link>
            </TypographyH4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start mt-2">
              {event.eventsPhotos.length > 0 &&
                event.eventsPhotos
                  .sort((a, b) =>
                    a.photo.createdAt > b.photo.createdAt ? 1 : -1
                  )
                  .map(({ photo }) => (
                    <div
                      key={photo.id}
                      className="border bg-background shadow-sm flex rounded-lg"
                    >
                      <Image
                        className="rounded-lg"
                        src={photo.imageUrl}
                        alt={photo.caption || photo.imageUrl}
                        width={300}
                        height={100}
                      />
                    </div>
                  ))}
              {event.eventsVideos.length > 0 &&
                event.eventsVideos
                  .sort((a, b) =>
                    a.video.publishedAt > b.video.publishedAt ? 1 : -1
                  )
                  .map(({ video }) => (
                    <div
                      key={video.id}
                      className="border bg-background shadow-sm hover:bg-accent hover:cursor-pointer h-full flex rounded-lg"
                    >
                      {video.videoType === "youtube" ? (
                        <YouTubeVideoCard video={video} />
                      ) : (
                        <video src={video.videoUrl || ""} controls />
                      )}
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
