import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/components/ui/typography";
import YouTubeVideoCard from "@/components/youtube-video-card";
import { db } from "@/db";
import { getDate, getMonthYear, localeDate, localeTime } from "@/lib/utils";
import { MapPinIcon, UsersIcon } from "lucide-react";
import Image from "next/image";

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  const event = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.id, params.id),
    with: {
      eventsSpeakers: {
        with: {
          user: {
            columns: { id: true, name: true, username: true, image: true },
          },
        },
      },
      eventsVideos: {
        with: {
          video: {
            columns: {
              id: true,
              title: true,
              videoType: true,
              videoUrl: true,
              thumbnails: true,
              publishedAt: true,
            },
          },
        },
      },
    },
  });

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle={event.name} />
      <div className="content-wrapper">
        <div className="content">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="grid grid-cols-1 gap-4">
                <Image
                  src={event.imageUrl || ""}
                  alt={event.name || ""}
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
                <div>
                  <TypographyH4>Speakers</TypographyH4>
                  {event.eventsSpeakers.map((speaker) => (
                    <div
                      key={speaker.user.id}
                      className="flex items-center my-4"
                    >
                      <Image
                        src={speaker.user.image || ""}
                        alt={speaker.user.name || ""}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <p className="ml-2 text-sm">{speaker.user.name}</p>
                    </div>
                  ))}
                  <TypographyH4>Hosts</TypographyH4>
                </div>
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <div className="grid grid-cols-1 gap-4">
                <div className="border border-slate-200 rounded-lg p-4 flex flex-col gap-2">
                  <TypographyH3 className="mb-2">{event.name}</TypographyH3>

                  <div className="grid grid-cols-2"></div>

                  {/* Schedule component */}
                  <div className="flex flex-row gap-3 items-center">
                    <div>
                      <p className="font-semibold text-xs text-white bg-black rounded-t-md p-2">
                        {getMonthYear(event.scheduledStart)}
                      </p>
                      <TypographyH2 className="rounded-b-md p-2 border border-t-0 text-md text-center">
                        {getDate(event.scheduledStart)}
                      </TypographyH2>
                    </div>
                    <div>
                      <TypographyH2 className="text-md pb-0">
                        {localeDate(event.scheduledStart)}
                      </TypographyH2>
                      <p className="text-xs text-neutral-500">
                        {localeTime(event.scheduledStart)}
                      </p>
                    </div>
                    {event.scheduledEnd && (
                      <>
                        <div>
                          {/* <TypographyH2 className="text-md pb-0">
                            -
                          </TypographyH2> */}
                          <p className="text-xs text-neutral-500">s/d</p>
                        </div>
                        <div>
                          <TypographyH2 className="text-md pb-0">
                            {localeDate(event.scheduledEnd)}
                          </TypographyH2>
                          <p className="text-xs text-neutral-500">
                            {localeTime(event.scheduledEnd)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Location component */}
                  <div className="flex flex-row gap-3 items-center">
                    <div className="rounded-md p-4 border text-md text-center">
                      <MapPinIcon />
                    </div>
                  </div>

                  {/* Quota component */}
                  <div className="flex flex-row gap-3 items-center">
                    <div className="rounded-md p-4 border text-md text-center">
                      <UsersIcon />
                    </div>
                    <div>
                      <TypographyH2 className="text-md pb-0">
                        {event.attendeeLimit} slot tersedia
                      </TypographyH2>
                      <p className="text-xs text-neutral-500">
                        dari {event.attendeeLimit} kuota
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex flex-col gap-2">
                    <TypographyH4>Tentang</TypographyH4>
                    <p className="text-sm">{event.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <div className="flex flex-col gap-2">
                <TypographyH4>Dokumentasi Kegiatan</TypographyH4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6">
                  {event.eventsVideos.map(({ video }) => (
                    <div key={video.id}>
                      {video.videoType === "youtube" ? (
                        <YouTubeVideoCard video={video} />
                      ) : (
                        <video src={video.videoUrl || ""} controls />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
