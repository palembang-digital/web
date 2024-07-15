import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { db } from "@/db";
import Link from "next/link";

export default async function Page() {
  const videos = await db.query.videos.findMany();
  return (
    <>
      <TypographyH1>Videos</TypographyH1>

      <Link href="/videos/new">
        <Button variant="outline">Add new video</Button>
      </Link>
      <div>
        {videos.map((video) => (
          <div key={video.id}>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
            <video src={video.videoUrl || ""} controls />
          </div>
        ))}
      </div>
    </>
  );
}
