import { auth } from "@/auth";
import EventDescription from "@/components/events/event-description";
import EventLocationType from "@/components/events/event-location-type";
import { FloatingHeader } from "@/components/floating-header";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { ScrollArea } from "@/components/scroll-area";
import SpeakersList from "@/components/speakers-list";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Button } from "@/components/ui/button";
import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/components/ui/typography";
import YouTubeVideoCard from "@/components/youtube-video-card";
import { getDate, getMonthYear, localeDate, localeTime } from "@/lib/utils";
import { getEvent } from "@/services";
import { GoogleMapsEmbed } from "@next/third-parties/google";
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

function EventCommittees({ committees }: { committees: any[] }) {
  const items = committees.map(({ user }) => ({
    id: user.id,
    label: user.name,
    image: user.image,
    href: `/${user.username}`,
  }));

  return (
    <div>
      <TypographyH4>Panitia</TypographyH4>
      <div className="flex flex-wrap">
        {items.map((item, index) => (
          <AnimatedTooltip key={`committees-${index}`} items={[item]} />
        ))}
      </div>
    </div>
  );
}

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  const event = await getEvent(params.id);
  if (!event) {
    return <p>Event not found</p>;
  }

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
                {event.eventsSpeakers.length > 0 && (
                  <SpeakersList speakers={event.eventsSpeakers} />
                )}
                {(event.eventsHostsOrganizations.length > 0 ||
                  event.eventsHostsUsers.length > 0) && (
                  <div>
                    <TypographyH4>Hosts</TypographyH4>
                    {event.eventsHostsOrganizations.map(({ organization }) => (
                      <div
                        key={organization.id}
                        className="flex items-center my-4"
                      >
                        <Image
                          src={organization.image || ""}
                          alt={organization.name || ""}
                          width={24}
                          height={24}
                          className="rounded-lg"
                        />
                        <p className="ml-2 text-sm">{organization.name}</p>
                      </div>
                    ))}
                    {event.eventsHostsUsers.map((host) => (
                      <Link
                        href={`/${host.user.username}`}
                        key={host.user.id}
                        className="flex items-center my-4"
                      >
                        <Image
                          src={host.user.image || ""}
                          alt={host.user.name || ""}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <p className="ml-2 text-sm">{host.user.name}</p>
                      </Link>
                    ))}
                  </div>
                )}
                {event.eventsCommittees.length > 0 && (
                  <EventCommittees committees={event.eventsCommittees} />
                )}
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
                          {event.attendeeLimit} slot tersedia
                        </TypographyH2>
                        <p className="text-xs text-neutral-500">
                          dari {event.attendeeLimit} kuota
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Registration component */}
                  {event.scheduledStart < new Date() ? (
                    <div>
                      <Button className="text-xs bg-green-600 hover:bg-green-600 hover:cursor-default">
                        <CircleCheckBigIcon className="mr-2 h-3 w-3" /> Kegiatan
                        ini telah berakhir
                      </Button>
                    </div>
                  ) : (
                    <Link href={event.registrationUrl || ""} className="w-full">
                      <ShimmerButton>
                        <TicketIcon className="mr-2 h-4 w-4" />
                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
                          Daftar sekarang!
                        </span>
                      </ShimmerButton>
                    </Link>
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

                {event.locationType === "offline" && (
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
                )}
              </div>
            </div>

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
