import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { getUsers, mergeUserEvents } from "@/services";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Anggota",
};

function MemberCard({ user }: { user: any }) {
  const eventShownLimit = 5;
  const events = mergeUserEvents(user).map((event: any) => ({
    id: event.id,
    label: event.name,
    href: `/events/${event.id}`,
    image: event.imageUrl,
    imageClassName: "rounded-sm",
  }));

  return (
    <div className="border rounded-lg p-4 flex flex-col h-full bg-background hover:bg-accent shadow-sm">
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
          <AnimatedTooltip items={events.slice(0, eventShownLimit)} />
          {events.length > eventShownLimit && (
            <p className="text-xs text-neutral-400 ml-3">
              +{events.length - eventShownLimit}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default async function Page() {
  const session = await auth();

  const users = await getUsers();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Anggota" />
      <div className="content-wrapper">
        <div className="content">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {users.map((user) => (
              <MemberCard user={user} key={user.id} />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
