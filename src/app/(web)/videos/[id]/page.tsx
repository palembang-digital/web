import { auth } from "@/auth";
import EventDescription from "@/components/events/event-description";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { TypographyH4 } from "@/components/ui/typography";
import { getYoutubeVideoId } from "@/lib/utils";
import { getVideo } from "@/services";
import { YouTubeEmbed } from "@next/third-parties/google";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const video = await getVideo(params.id);
  if (!video) {
    return {
      title: "Video not found",
    };
  }

  return {
    title: video.title,
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  const video = await getVideo(params.id);
  if (!video) {
    return (
      <ScrollArea useScrollAreaId>
        <FloatingHeader session={session} scrollTitle="Video tidak ditemukan" />
        <p>Video not found</p>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader
        session={session}
        scrollTitle={video.title}
        goBackLink="/gallery"
      />
      <div className="content-wrapper">
        <div className="content">
          <div className="flex flex-col gap-4">
            <TypographyH4>{video.title}</TypographyH4>

            <YouTubeEmbed
              videoid={getYoutubeVideoId(video.videoUrl || "")}
              style="border-radius: 8px"
            />

            {video.eventsVideos.length > 0 && (
              <div className="border border-slate-200 rounded-lg p-4">
                {video.eventsVideos.map(({ event }) => (
                  <div key={event.id} className="flex flex-col gap-2">
                    <TypographyH4>
                      Tentang kegiatan{" "}
                      <Link href={`/events/${event.id}`} className="underline">
                        {event.name}
                      </Link>
                    </TypographyH4>
                    {event.description && (
                      <EventDescription description={event.description} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
