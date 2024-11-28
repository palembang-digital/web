import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import Image from "next/image";
import Link from "next/link";

export default function MemberCard({
  user,
  events,
  eventShownLimit = 0,
}: {
  user: any;
  events: any[];
  eventShownLimit: number;
}) {
  return (
    <div className="border rounded-lg p-4 flex flex-col h-full bg-background hover:bg-accent shadow-sm w-64">
      <Link href={`/${user.username}`}>
        <Image
          src={user.image || ""}
          width={64}
          height={64}
          alt={user.name || "Profile Picture"}
          className="rounded-full mb-2"
        />
        <p className="text-xs text-neutral-400 mb-2">{user.username}</p>
        <p className="text-sm">{user.name}</p>
        <p className="text-xs text-neutral-500">{user.occupation}</p>
      </Link>
      {events?.length > 0 && (
        <div className="flex mt-2 items-center">
          <p className="text-xs text-neutral-400 mr-1">Kegiatan:</p>
          {eventShownLimit && (
            <AnimatedTooltip items={events.slice(0, eventShownLimit)} />
          )}
          {eventShownLimit && events.length > eventShownLimit && (
            <p className="text-xs text-neutral-400 ml-3">
              +{events.length - eventShownLimit}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
