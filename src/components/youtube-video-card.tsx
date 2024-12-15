import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import Image from "next/image";
import Link from "next/link";

export default function YouTubeVideoCard({
  video,
  speakers,
}: {
  video: any;
  speakers?: any;
}) {
  const items = speakers
    ? speakers.map((speaker: any) => ({
        id: speaker.userId,
        label: speaker.user.name,
        description: speaker.user.bio,
        image: speaker.user.image,
      }))
    : [];

  return (
    <div className="">
      <Link href={`/videos/${video.id}`}>
        <Image
          className="rounded-t-lg"
          src={video.thumbnails?.medium.url}
          width={video.thumbnails?.medium.width}
          height={video.thumbnails?.medium.height}
          alt={video.title}
        />
        <div className="p-3">
          <p className="text-xs">{video.title}</p>
        </div>
      </Link>
      {items.length > 0 && (
        <div className="flex items-center p-4 pt-0">
          <AnimatedTooltip items={items} />
        </div>
      )}
    </div>
  );
}
