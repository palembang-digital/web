import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { TypographyH4 } from "@/components/ui/typography";
import { db } from "@/db";
import { getYoutubeVideoId } from "@/lib/utils";
import { YouTubeEmbed } from "@next/third-parties/google";
import Link from "next/link";

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  const video = await db.query.videos.findFirst({
    where: (videos, { eq }) => eq(videos.id, params.id),
    with: {
      eventsVideos: {
        with: {
          event: {
            columns: { id: true, name: true, description: true },
          },
        },
      },
    },
  });

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
      <FloatingHeader session={session} scrollTitle="Galeri" />
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
                      Tentang kegiatan:{" "}
                      <Link href={`/events/${event.id}`}>{event.name}</Link>
                    </TypographyH4>
                    <p className="text-sm">{event.description}</p>
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