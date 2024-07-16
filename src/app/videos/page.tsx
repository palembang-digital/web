import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { db } from "@/db";
import { YouTubeEmbed } from "@next/third-parties/google";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  const videos = await db.query.videos.findMany();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Kegiatan Patal" />
      <div className="content-wrapper">
        <div className="content">
          <TypographyH1>Videos</TypographyH1>

          <Link href="/videos/new">
            <Button variant="outline">Add new video</Button>
          </Link>
          <div className="grid gap-4">
            {videos.map((video) => (
              <div key={video.id}>
                <h2>{video.title}</h2>
                {video.videoType === "youtube" ? (
                  <YouTubeEmbed
                    videoid={video.videoUrl?.split("v=")[1] || ""}
                    width={240}
                  />
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
