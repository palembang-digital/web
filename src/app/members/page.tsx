import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { db } from "@/db";
import Image from "next/image";

export default async function Page() {
  const session = await auth();

  const users = await db.query.users.findMany({
    orderBy: (users, { asc }) => [asc(users.name)],
  });

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Anggota" />
      <div className="content-wrapper">
        <div className="content">
          <div className="flex flex-col gap-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-2">
                <Image
                  src={user.image || ""}
                  width={48}
                  height={48}
                  alt={user.name || "Profile Picture"}
                  className="rounded-full"
                />
                <p>{`${user.name}`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
