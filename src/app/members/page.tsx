import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { db } from "@/db";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  const users = await db.query.users.findMany({
    orderBy: (users, { asc }) => [asc(users.name)],
    with: {
      eventsSpeakers: true,
    },
  });

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Anggota" />
      <div className="content-wrapper">
        <div className="content">
          <div className="flex flex-col gap-2">
            {users.map((user) => (
              <Link key={user.id} href={`/${user.username}`}>
                <div className="flex items-center gap-2">
                  <Image
                    src={user.image || ""}
                    width={48}
                    height={48}
                    alt={user.name || "Profile Picture"}
                    className="rounded-full"
                  />
                  <p>{`${user.name}`}</p>
                  <p className="text-sm text-neutral-500">{`${user.username}`}</p>
                  {user.eventsSpeakers?.length > 0 && (
                    <p className="text-sm text-neutral-500">
                      {user.eventsSpeakers?.length}x speaker
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
