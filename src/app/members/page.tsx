import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { db } from "@/db";
import Image from "next/image";
import Link from "next/link";

function MemberCard({ user }: { user: any }) {
  const events = user.eventsSpeakers?.map((event: any) => ({
    id: event.eventId,
    label: event.event.name,
    href: `/events/${event.eventId}`,
    image: event.event.imageUrl,
    imageClassName: "rounded-sm",
  }));

  return (
    <div className="border rounded-lg p-4 flex flex-col h-full">
      <Link key={user.id} href={`/${user.username}`}>
        <Image
          src={user.image || ""}
          width={64}
          height={64}
          alt={user.name || "Profile Picture"}
          className="rounded-full mb-2"
        />
        <p className="text-xs text-neutral-400 mb-2">{user.username}</p>
        <p className="text-sm">{user.name}</p>
        <p className="text-xs text-neutral-500">{user.bio}</p>
      </Link>
      {user.eventsSpeakers?.length > 0 && (
        <div className="flex mt-2 items-center">
          <p className="text-xs text-neutral-400 mr-1">Kegiatan:</p>
          <AnimatedTooltip items={events} />
        </div>
      )}
    </div>
  );
}

export default async function Page() {
  const session = await auth();

  const users = await db.query.users.findMany({
    orderBy: (users, { asc }) => [asc(users.name)],
    with: {
      eventsSpeakers: {
        with: {
          event: {
            columns: { id: true, name: true, imageUrl: true },
          },
        },
      },
    },
  });

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
