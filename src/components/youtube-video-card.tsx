import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { TypographyH3 } from "./ui/typography";

export default function YouTubeVideoCard({ video }: { video: any }) {
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
        <AnimatedTooltip items={people} />
      </div>
    </div>
  );
}
