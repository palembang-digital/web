"use client";

import CerticateDownload from "@/components/certificates/download";
import EventCard from "@/components/events/event-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YouTubeVideoCard from "@/components/youtube-video-card";
import { localeDate } from "@/lib/utils";
import { DownloadIcon } from "@radix-ui/react-icons";
import { saveAs } from "file-saver";
import Image from "next/image";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";

export default function ProfileTabs({
  name,
  events,
  certificates,
  videos,
}: {
  name: string;
  events: any[];
  certificates: any[];
  videos: any[];
}) {
  const [tab, setTab] = useQueryState(
    "tab",
    parseAsString.withDefault("events")
  );

  const downloadCertificate = (cert: any) => {
    saveAs(`/certificates/${cert.id}`, `${name} - ${cert.event.name}.png`);
  };

  return (
    <Tabs
      value={tab}
      defaultValue={tab}
      onValueChange={(value) => setTab(value)}
    >
      <TabsList>
        <TabsTrigger value="events">Kegiatan</TabsTrigger>
        <TabsTrigger value="certificates">Sertifikat</TabsTrigger>
        <TabsTrigger value="videos">Video</TabsTrigger>
      </TabsList>

      <TabsContent value="events">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 pt-2">
            {events
              .sort((a, b) => (a.scheduledStart < b.scheduledStart ? 1 : -1))
              .map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
        ) : (
          <p className="text-sm">
            Sepertinya {name} belum pernah mengikuti kegiatan Palembang Digital
            🤔
          </p>
        )}
      </TabsContent>

      <TabsContent value="certificates">
        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 pt-2">
            {certificates
              .sort((a, b) =>
                a.event.scheduledStart < b.event.scheduledStart ? 1 : -1
              )
              .map((certificate) => (
                <div key={certificate.id} className="bg-background">
                  {certificate.template === "sdc-2024" ? (
                    <div className="bg-accent rounded-t-lg">
                      <div className="flex p-4 items-center justify-between">
                        <Link
                          href={`/events/${certificate.event.id}`}
                          className="text-xs hover:underline text-gray-600 hover:text-gray-900"
                        >
                          {certificate.event.name}
                        </Link>
                        <DownloadIcon
                          className="w-4 h-4 hover:cursor-pointer text-gray-600 hover:text-gray-900"
                          onClick={() => downloadCertificate(certificate)}
                        />
                      </div>
                      <Image
                        src={`/certificates/${certificate.id}`}
                        width={1123}
                        height={794}
                        alt={certificate.event.name}
                      />
                    </div>
                  ) : (
                    <CerticateDownload
                      eventName={certificate.event.name}
                      recipientName={name || ""}
                      role={certificate.role || "Peserta"}
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
                  )}
                </div>
              ))}
          </div>
        ) : (
          <p className="text-sm">
            Sepertinya {name} belum push rank ngumpulin sertifikat 🤔
          </p>
        )}
      </TabsContent>

      <TabsContent value="videos">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mt-4">
          {videos &&
            videos
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
  );
}
