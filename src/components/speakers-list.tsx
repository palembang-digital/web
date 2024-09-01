import { TypographyH4 } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";

export default function SpeakersList({ speakers }: { speakers: any[] }) {
  return (
    <div>
      <TypographyH4>Speakers</TypographyH4>
      {speakers
        .sort((a, b) => a.user.name.localeCompare(b.user.name))
        .map((speaker) => (
          <Link
            href={`/${speaker.user.username}`}
            key={speaker.user.id}
            className="flex items-center my-4"
          >
            <Image
              src={speaker.user.image || ""}
              alt={speaker.user.name || ""}
              width={24}
              height={24}
              className="rounded-full"
            />
            <p className="ml-2 text-sm">{speaker.user.name}</p>
          </Link>
        ))}
    </div>
  );
}
