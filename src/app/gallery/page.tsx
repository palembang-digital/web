import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { db } from "@/db";
import { DateTime } from "luxon";
import Image from "next/image";

function YouTubeVideoCard({ video }: { video: any }) {
  return (
    <div className="rounded-lg p-2 hover:shadow-sm hover:cursor-pointer">
      {/* <div className="bg-zinc-400 h-40 flex items-center justify-center text-white text-xl rounded-md">
        Video
      </div> */}
      <Image
        className="rounded-lg"
        src={video.thumbnails?.medium.url}
        width={video.thumbnails?.medium.width}
        height={video.thumbnails?.medium.height}
        alt={video.title}
      />
      <div className="mt-4">
        <p className="text-muted-foreground text-sm">
          {DateTime.fromJSDate(video.publishedAt)
            .setLocale("id")
            .toLocaleString(DateTime.DATE_FULL)}
        </p>
        <h3 className="text-foreground font-semibold">{video.title}</h3>
        <div className="flex items-center mt-2 pl-2">
          <img
            className="w-6 h-6 rounded-full border-2 border-white -ml-2"
            src="https://placehold.co/24x24"
            alt="User 1"
          />
          <img
            className="w-6 h-6 rounded-full border-2 border-white -ml-2"
            src="https://placehold.co/24x24"
            alt="User 2"
          />
          <img
            className="w-6 h-6 rounded-full border-2 border-white -ml-2"
            src="https://placehold.co/24x24"
            alt="User 3"
          />
          <span className="text-muted-foreground ml-2">+2</span>
        </div>
      </div>
    </div>
  );
}

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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-8">
            {videos.map((video) => (
              <div key={video.id}>
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
