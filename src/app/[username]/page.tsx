import { auth } from "@/auth";
import CerticateDownload from "@/components/certificates/download";
import EventCard from "@/components/events/event-card";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { SignOut } from "@/components/sign-out";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YouTubeVideoCard from "@/components/youtube-video-card";
import { localeDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { getUser } from "@/services";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const user = await getUser(params.username);
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

  const user = await getUser(params.username);
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
                  {user.certificates.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 pt-2">
                      {user.certificates.map((certificate) => (
                        <div key={certificate.id} className="bg-background p-4">
                          <CerticateDownload
                            eventName={certificate.event.name}
                            recipientName={user.name || ""}
                            startDate={certificate.event.scheduledStart}
                            endDate={
                              localeDate(certificate.event.scheduledStart) !==
                              localeDate(certificate.event.scheduledEnd)
                                ? certificate.event.scheduledEnd
                                : undefined
                            }
                            certificateCode={certificate.id}
                            certificateTitle="Sertifikat Apresiasi"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm">
                      Sepertinya {user.name} belum push rank ngumpulin
                      sertifikat 🤔
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="videos">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mt-4">
                    {user.videosSpeakers &&
                      user.videosSpeakers
                        .sort((a, b) =>
                          a.video.publishedAt < b.video.publishedAt ? 1 : -1
                        )
                        .map(({ video }) => (
                          <div
                            key={video.id}
                            className="bg-background hover:bg-accent hover:cursor-pointer shadow-sm flex h-full border rounded-lg"
                          >
                            {video.videoType === "youtube" ? (
                              <YouTubeVideoCard video={video} />
                            ) : (
                              <video src={video.videoUrl || ""} controls />
                            )}
                          </div>
                        ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
