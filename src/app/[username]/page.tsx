import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { SignOut } from "@/components/sign-out";
import { Separator } from "@/components/ui/separator";
import { getUser, mergeUserEvents } from "@/services";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProfileTabs from "./components/profile-tabs";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const username = params.username.startsWith("%40")
    ? params.username.slice(3)
    : params.username;

  const user = await getUser(username);
  if (!user) {
    return {
      title: "User not found",
    };
  }

  return {
    title: `${user.username} (${user.name})`,
  };
}

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const session = await auth();

  const username = params.username.startsWith("%40")
    ? params.username.slice(3)
    : params.username;

  const user = await getUser(username);
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

  const events = mergeUserEvents(user);

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader
        session={session}
        scrollTitle={session?.user?.name || "Profil"}
      />
      <div className="content-wrapper">
        <div className="content">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-1">
              <Image
                src={user.image || ""}
                width={64}
                height={64}
                alt={user.name || "Profile Picture"}
                className="rounded-full mb-2"
              />
              <p className="text-xs text-neutral-400 mb-2">{user.username}</p>
              <p className="text-md">{user.name}</p>
              <p className="text-xs">{user.occupation}</p>
              {user.institution && (
                <p className="text-xs mb-2">🏢 {user.institution}</p>
              )}
              <p className="text-xs text-neutral-500 mb-4">{user.bio}</p>
              {
                // @ts-ignore
                session && session.user?.username === user.username && (
                  <>
                    <Separator />
                    <Link href="/settings/profile">
                      <p className="text-xs text-neutral-500 hover:underline mt-4">
                        Pengaturan
                      </p>
                    </Link>
                    <SignOut />
                  </>
                )
              }
            </div>

            <div className="col-span-1 sm:col-span-2">
              <ProfileTabs
                name={user.name || ""}
                events={events}
                certificates={user.certificates.filter(
                  (cert) => cert.status === "approved"
                )}
                videos={user.videosSpeakers}
              />
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
