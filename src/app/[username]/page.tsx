import { auth } from "@/auth";
import DownloadTest from "@/components/certificates/download";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { SignOut } from "@/components/sign-out";
import { TypographyH4 } from "@/components/ui/typography";
import { db } from "@/db";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const session = await auth();

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, params.username),
    with: {
      eventsSpeakers: {
        with: {
          event: {
            columns: { id: true, name: true },
          },
        },
      },
    },
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
          <SignOut />
          <Image
            src={user.image || ""}
            width={48}
            height={48}
            alt={user.name || ""}
            className="rounded-full"
          />
          <p>{user.name}</p>
          <p>{user.username}</p>
          <TypographyH4>Pernah menjadi speakers di event berikut:</TypographyH4>
          <ol className="list-decimal">
            {user.eventsSpeakers.map(({ event }) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <li>{event.name}</li>
              </Link>
            ))}
          </ol>

          <TypographyH4>Sertifikat:</TypographyH4>
          <DownloadTest />
        </div>
      </div>
    </ScrollArea>
  );
}
