import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { TypographyH3 } from "./ui/typography";

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
        <div className="p-4 pb-3">
          <p className="text-muted-foreground text-xs">
            {DateTime.fromJSDate(video.publishedAt)
              .setLocale("id")
              .toLocaleString(DateTime.DATE_FULL)}
          </p>
          <TypographyH3 className="text-foreground text-sm font-semibold">
            {video.title}
          </TypographyH3>
        </div>
      </Link>
      <div className="flex items-center p-4 pt-0">
        <AnimatedTooltip items={items} />
      </div>
    </div>
  );
}
