import { auth } from "@/auth";
import DownloadTest from "@/components/certificates/download";
import EventCard from "@/components/events/event-card";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    with: {
      eventsSpeakers: {
        with: {
          event: {
            columns: {
              id: true,
              name: true,
              imageUrl: true,
              scheduledStart: true,
            },
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

  const defaultTab = "events";

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
              <p className="text-sm">{user.name}</p>
              <p className="text-xs text-neutral-500">{user.bio}</p>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <Tabs defaultValue={defaultTab}>
                <TabsList>
                  <TabsTrigger value="events">Kegiatan</TabsTrigger>
                  <TabsTrigger value="certificates">Sertifikat</TabsTrigger>
                  <TabsTrigger value="videos">Video</TabsTrigger>
                </TabsList>

                <TabsContent value={defaultTab}>
                  {user.eventsSpeakers.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 pt-2">
                      {user.eventsSpeakers
                        .sort((a, b) =>
                          a.event.scheduledStart < b.event.scheduledStart
                            ? 1
                            : -1
                        )
                        .map((eventSpeaker) => (
                          <EventCard
                            key={eventSpeaker.event.id}
                            event={eventSpeaker.event}
                          />
                        ))}
                    </div>
                  ) : (
                    <p className="text-sm">
                      Sepertinya {user.name} belum pernah mengikuti kegiatan
                      Palembang Digital 🤔
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="certificates">
                  <DownloadTest />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
