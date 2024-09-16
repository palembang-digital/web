import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import YouTubeVideoCard from "@/components/youtube-video-card";
import { db } from "@/db";

export default async function Page() {
  const session = await auth();

  const videos = await db.query.videos.findMany({
    orderBy: (videos, { desc }) => [desc(videos.publishedAt)],
  });

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Galeri" />
      <div className="content-wrapper">
        <div className="content">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-background hover:bg-accent hover:cursor-pointer shadow-sm flex h-full border rounded-lg"
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
    </ScrollArea>
  );
}
