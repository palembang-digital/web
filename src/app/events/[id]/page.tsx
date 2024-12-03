import { auth } from "@/auth";
import EventDescription from "@/components/events/event-description";
import EventLocationType from "@/components/events/event-location-type";
import EventRegistrationDialog from "@/components/events/event-registration-dialog";
import EventSidebarInfo from "@/components/events/event-sidebar-info";
import { FloatingHeader } from "@/components/floating-header";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { ScrollArea } from "@/components/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/components/ui/typography";
import YouTubeVideoCard from "@/components/youtube-video-card";
import {
  cn,
  getDate,
  getMonthYear,
  localeDate,
  localeTime,
  toGCalDate,
} from "@/lib/utils";
import { getEvent } from "@/services";
import {
  CircleCheckBigIcon,
  MapPinIcon,
  TicketIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react";
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
  return (
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
        {localeDate(event.scheduledStart) !== localeDate(event.scheduledEnd) ? (
          <>
            <TypographyH2 className="text-md pb-0">
              {localeDate(event.scheduledStart)}
            </TypographyH2>
            <p className="text-xs text-neutral-500">
              {localeTime(event.scheduledStart)}
            </p>
          </>
        ) : (
          <TypographyH2 className="text-md pb-0">
            {localeTime(event.scheduledStart)}
          </TypographyH2>
        )}
      </div>

      {event.scheduledEnd && (
        <>
          <div>
            <p className="text-xs text-neutral-500">s/d</p>
          </div>
          <div>
            {localeDate(event.scheduledStart) !==
            localeDate(event.scheduledEnd) ? (
              <>
                <TypographyH2 className="text-md pb-0">
                  {localeDate(event.scheduledEnd)}
                </TypographyH2>
                <p className="text-xs text-neutral-500">
                  {localeTime(event.scheduledEnd)}
                </p>
              </>
            ) : (
              <TypographyH2 className="text-md pb-0">
                {localeTime(event.scheduledEnd)}
              </TypographyH2>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function isUserRegistered(event: any, user: any) {
  if (!user) {
    return false;
  }

  return event.eventsAttendees.some(
    (attendee: any) => attendee.user.id === user.id && attendee.rsvp === "yes"
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

  const isRegistered = isUserRegistered(event, session?.user);

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
                <div
                  className={cn(
                    "border border-slate-200 rounded-lg p-4 flex flex-col gap-2"
                  )}
                >
                  {isRegistered && (
                    <div className="flex flex-col gap-2">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image || ""}
                          alt={session?.user?.name || ""}
                        />
                        <AvatarFallback>
                          {session?.user?.name || ""}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-md font-medium">
                        Hai {session?.user?.name}, kamu telah terdaftar!
                      </p>
                      <div>
                        <Link
                          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${
                            event.name
                          }&dates=${toGCalDate(
                            event.scheduledStart
                          )}/${toGCalDate(event.scheduledEnd)}&details=${
                            event.description
                          }&ctz=Asia/Jakarta&location=${event.locationName}`}
                          target="_blank"
                        >
                          <Button className="text-xs" variant="outline">
                            Tambahkan ke Google Calendar
                          </Button>
                        </Link>
                      </div>
                      <EventRegistrationDialog
                        event={event}
                        user={session?.user}
                        actionType="update"
                      />
                    </div>
                  )}

                  {!isRegistered && event.scheduledEnd < new Date() && (
                    <div>
                      <Button className="text-xs bg-green-600 hover:bg-green-600 hover:cursor-default">
                        <CircleCheckBigIcon className="mr-2 h-3 w-3" /> Kegiatan
                        ini telah berakhir
                      </Button>
                    </div>
                  )}

                  {event.scheduledStart >= new Date() &&
                  !isRegistered &&
                  event.registrationUrlType === "internal" ? (
                    <EventRegistrationDialog
                      event={event}
                      user={session?.user}
                      actionType="register"
                    />
                  ) : (
                    !isRegistered &&
                    event.registrationUrl && (
                      <Link
                        href={
                          event.registrationUrlType === "internal"
                            ? `/events/${event.id}/register`
                            : event.registrationUrl || ""
                        }
                        className="w-full"
                      >
                        <ShimmerButton>
                          <TicketIcon className="mr-2 h-4 w-4" />
                          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
                            Daftar sekarang!
                          </span>
                        </ShimmerButton>
                      </Link>
                    )
                  )}
                </div>

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
              className="lg:hidden flex flex-col"
            />

            {totalAttendees > 0 && (
              <div className="col-span-1 sm:col-span-3">
                <div className="flex flex-col gap-2">
                  <Link href={`/events/${event.id}/attendees`}>
                    <TypographyH4>Peserta ({totalAttendees})</TypographyH4>
                  </Link>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {event.eventsAttendees
                      .sort((a: any, b: any) =>
                        a.user.name.localeCompare(b.user.name)
                      )
                      .map(
                        ({ user, rsvp }) =>
                          rsvp === "yes" && (
                            <Link href={`/${user.username}`} key={user.id}>
                              <div className="flex items-center gap-2">
                                <Avatar>
                                  <AvatarImage
                                    src={user.image || ""}
                                    alt={user.name || ""}
                                  />
                                  <AvatarFallback>{user.name}</AvatarFallback>
                                </Avatar>
                              </div>
                            </Link>
                          )
                      )}
                  </div>
                </div>
              </div>
            )}

            {event.eventsVideos.length > 0 && (
              <div className="col-span-1 sm:col-span-3">
                <div className="flex flex-col gap-2">
                  <TypographyH4>Dokumentasi Kegiatan</TypographyH4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6">
                    {event.eventsVideos
                      .sort((a, b) =>
                        a.video.publishedAt > b.video.publishedAt ? 1 : -1
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
