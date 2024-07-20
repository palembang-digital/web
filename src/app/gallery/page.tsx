import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { db } from "@/db";
import { DateTime } from "luxon";
import Image from "next/image";

function YouTubeVideoCard({ video }: { video: any }) {
  const people = [
    {
      id: 1,
      label: "John Doe",
      description: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      label: "Robert Johnson",
      description: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      label: "Jane Smith",
      description: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      label: "Emily Davis",
      description: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
  ];

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
          <AnimatedTooltip items={people} />
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
