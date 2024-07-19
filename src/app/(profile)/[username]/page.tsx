import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { db } from "@/db";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const session = await auth();

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, params.username),
  });

  if (!user) {
    return (
      <ScrollArea useScrollAreaId>
        <FloatingHeader
          session={session}
          scrollTitle="Pengguna tidak ditemukan"
        />
        <p>User not found</p>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader
        session={session}
        scrollTitle={session?.user?.name || "Profil"}
      />
      <div className="content-wrapper">
        <div className="content">
          <p>{JSON.stringify(user)}</p>
          <Image
            src={user.image || ""}
            width={48}
            height={48}
            alt={user.name || ""}
            className="rounded-full"
          />
          <p>{user.name}</p>
          <p>{user.username}</p>
        </div>
      </div>
    </ScrollArea>
  );
}
