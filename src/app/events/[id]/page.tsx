import { auth } from "@/auth";
import EventDescription from "@/components/events/event-description";
import EventDiscussionPanel from "@/components/events/event-discussion/event-discussion-panel";
import EventLocationType from "@/components/events/event-location-type";
import EventRegistrationPanel from "@/components/events/event-registration-panel";
import EventSidebarInfo from "@/components/events/event-sidebar-info";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/components/ui/typography";
import YouTubeVideoCard from "@/components/youtube-video-card";
import {
  getDate,
  getDay,
  getMonthYear,
  localeDate,
  localeTime,
} from "@/lib/utils";
import { getEvent } from "@/services";
import { MapPinIcon, UsersIcon, VideoIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const event = await getEvent(params.id);
  if (!event) {
    return {
      title: "Event not found",
    };
  }

  return {
    title: event.name,
    openGraph: {
      title: `${event.name} · Palembang Digital`,
      description: `Segera daftarkan diri kamu di kegiatan ${
        event.name
      } yang akan diselenggarakan pada ${localeDate(event.scheduledStart)}`,
      images: `/events/${params.id}/og.png`,
      type: "article",
    },
  };
}

function EventSchedule({ event }: { event: any }) {
  const isSameDay =
    localeDate(event.scheduledStart) === localeDate(event.scheduledEnd);

  return (
    <div className="flex flex-row gap-3 items-center mt-2">
      <div>
        <p className="font-semibold text-xs text-white bg-black rounded-t-md p-2">
          {getMonthYear(event.scheduledStart)}
        </p>
        <TypographyH2 className="rounded-b-md p-2 border border-t-0 text-md text-center">
          {getDate(event.scheduledStart)}
        </TypographyH2>
      </div>
      {isSameDay ? (
        <div className="flex flex-col">
          <TypographyH2 className="text-md pb-0">
            {getDay(event.scheduledStart)}, {localeDate(event.scheduledStart)}
          </TypographyH2>
          <p className="text-sm text-neutral-500">
            {localeTime(event.scheduledStart)}
            {event.scheduledEnd && ` - ${localeTime(event.scheduledEnd)}`}
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2">
            <TypographyH2 className="text-md pb-0">
              {getDay(event.scheduledStart)}, {localeDate(event.scheduledStart)}
            </TypographyH2>
            <p className="text-sm text-neutral-500">
              {localeTime(event.scheduledStart)}
            </p>
          </div>
          <p className="text-xs text-neutral-500">s/d</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2">
            <TypographyH2 className="text-md pb-0">
              {getDay(event.scheduledEnd)}, {localeDate(event.scheduledEnd)}
            </TypographyH2>
            <p className="text-sm text-neutral-500">
              {localeTime(event.scheduledEnd)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  const event = await getEvent(params.id);
  if (!event) {
    return <p>Event not found</p>;
  }

  const totalAttendees = event.eventsAttendees.filter(
    (a) => a.rsvp === "yes"
  ).length;

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle={event.name} />
      <div className="content-wrapper">
        <div className="content">
          {
            // @ts-ignore
            session?.user?.role === "administrator" && (
              <Link href={`/events/${params.id}/edit`}>Edit</Link>
            )
          }
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
                <EventSidebarInfo
                  event={event}
                  className="hidden lg:flex lg:flex-col"
                />
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <div className="grid grid-cols-1 gap-4">
                <div className="border border-slate-200 rounded-lg p-4 flex flex-col gap-2">
                  <TypographyH3>{event.name}</TypographyH3>

                  {/* Schedule component */}
                  <EventSchedule event={event} />

                  {/* Location component */}
                  {event.locationName && (
                    <div className="flex flex-row gap-3 items-center">
                      <div className="rounded-md p-4 border text-md text-center">
                        {event.locationType === "offline" && <MapPinIcon />}
                        {event.locationType === "online" && <VideoIcon />}
                      </div>
                      <div>
                        <TypographyH2 className="text-md pb-0">
                          {event.locationName}
                        </TypographyH2>
                        {event.locationType && (
                          <EventLocationType type={event.locationType} />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quota component */}
                  {event.attendeeLimit && (
                    <div className="flex flex-row gap-3 items-center">
                      <div className="rounded-md p-4 border text-md text-center">
                        <UsersIcon />
                      </div>
                      <div>
                        <TypographyH2 className="text-md pb-0">
                          {event.attendeeLimit - totalAttendees} kursi tersedia
                        </TypographyH2>
                        <p className="text-xs text-neutral-500">
                          dari {event.attendeeLimit} kuota
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Registration component */}
                <EventRegistrationPanel session={session} event={event} />

                {event.description &&
                  event.description !==
                    `<p class="text-node"></p><p class="text-node"></p>` && (
                    <div className="border border-slate-200 rounded-lg p-4">
                      <div className="flex flex-col gap-2">
                        <TypographyH4>Tentang</TypographyH4>
                        {/* <p className="text-sm">{event.description}</p> */}
                        {/* <div
                        dangerouslySetInnerHTML={{ __html: event.description }}
                      /> */}
                        <EventDescription description={event.description} />
                      </div>
                    </div>
                  )}

                {/* Sponsors component */}
                {(event.eventsSponsorsOrganizations.length > 0 ||
                  event.eventsSponsorsUsers.length > 0) && (
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex flex-col gap-2">
                      <TypographyH4>Sponsors</TypographyH4>
                      <div className="flex flex-wrap gap-2">
                        {event.eventsSponsorsOrganizations
                          .sort((a: any, b: any) =>
                            a.organization.name.localeCompare(
                              b.organization.name
                            )
                          )
                          .map(({ organization }: { organization: any }) => (
                            <div
                              key={organization.id}
                              className="flex items-center my-4"
                            >
                              <Image
                                src={organization.image || ""}
                                alt={organization.name || ""}
                                width={40}
                                height={40}
                                className="rounded-lg"
                              />
                            </div>
                          ))}
                        {event.eventsSponsorsUsers
                          .sort((a: any, b: any) =>
                            a.user.name.localeCompare(b.user.name)
                          )
                          .map((user: any) => (
                            <Link
                              href={`/${user.user.username}`}
                              key={user.user.id}
                              className="flex items-center my-4 hover:underline"
                            >
                              <Image
                                src={user.user.image || ""}
                                alt={user.user.name || ""}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* {event.locationType === "offline" && (
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-3 items-center">
                        <div className="rounded-md p-4 border text-md text-center">
                          <MapPinIcon />
                        </div>
                        <div>
                          <TypographyH2 className="text-md pb-0">
                            {event.locationName}
                          </TypographyH2>
                          <p className="text-xs text-neutral-500">
                            <Link href={event.locationUrl || ""}>
                              Lihat peta
                            </Link>
                          </p>
                        </div>
                      </div>
                      <GoogleMapsEmbed
                        apiKey={process.env.GOOGLE_MAPS_API_KEY || ""}
                        mode="place"
                        q={event.locationName || ""}
                        height={256}
                        width="100%"
                        allowfullscreen={false}
                        style="border-radius: 6px;"
                      />
                    </div>
                  </div>
                )} */}
              </div>
            </div>

            <EventSidebarInfo
              event={event}
              className="lg:hidden flex flex-col col-span-1 sm:col-span-3"
            />

            {totalAttendees > 0 && (
              <div className="col-span-1 sm:col-span-3">
                <div className="flex flex-col gap-2">
                  <Link href={`/events/${event.id}/attendees`}>
                    <TypographyH4>Peserta ({totalAttendees})</TypographyH4>
                  </Link>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {event.eventsAttendees
                      .filter((a) => a.rsvp === "yes")
                      .sort((a: any, b: any) =>
                        a.user.name.localeCompare(b.user.name)
                      )
                      .map(({ user }) => (
                        <Link href={`/${user.username}`} key={user.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="rounded-full h-6 w-6">
                              <AvatarImage
                                src={user.image || ""}
                                alt={user.name || ""}
                              />
                              <AvatarFallback>{user.name || ""}</AvatarFallback>
                            </Avatar>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {(event.eventsPhotos.length > 0 ||
              event.eventsVideos.length > 0) && (
              <div className="col-span-1 sm:col-span-3 mt-4">
                <div className="flex flex-col gap-2">
                  <TypographyH4>
                    Dokumentasi Kegiatan (
                    {event.eventsPhotos.length + event.eventsVideos.length})
                  </TypographyH4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {event.eventsPhotos.length > 0 &&
                      event.eventsPhotos
                        .sort((a, b) =>
                          a.photo.createdAt > b.photo.createdAt ? 1 : -1
                        )
                        .map(({ photo }) => (
                          <div
                            key={photo.id}
                            className="bg-background flex h-full rounded-lg"
                          >
                            <Image
                              className="rounded-lg"
                              src={photo.imageUrl}
                              alt={photo.caption || photo.imageUrl}
                              width={300}
                              height={100}
                            />
                          </div>
                        ))}
                    {event.eventsVideos.length > 0 &&
                      event.eventsVideos
                        .sort((a, b) =>
                          a.video.publishedAt > b.video.publishedAt ? 1 : -1
                        )
                        .map(({ video }) => (
                          <div
                            key={video.id}
                            className="border bg-background hover:bg-accent hover:cursor-pointer flex h-full rounded-lg"
                          >
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
            )}

            <EventDiscussionPanel session={session} event={event} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
