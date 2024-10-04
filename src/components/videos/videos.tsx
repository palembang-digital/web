"use client";

import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import YouTubeVideoCard from "@/components/youtube-video-card";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import useSWR from "swr";

export default function Videos({
  hideSeeMoreButton,
  limit = 1000,
}: {
  hideSeeMoreButton?: boolean;
  limit?: number;
}) {
  const { data, isLoading } = useSWR(`/api/v1/videos?limit=${limit}`, fetcher);

  if (isLoading) {
    return <div className="p-6">Loading our core memories...</div>;
  }

  return (
    <div className="p-6">
      <p className="italic text-neutral-400">Videos</p>
      <TypographyH2 className="text-neutral-800 mb-2">Galeri</TypographyH2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6">
        {data &&
          data.map((video: any) => (
            <div
              key={video.id}
              className="bg-background hover:bg-accent hover:cursor-pointer shadow-sm flex h-full border rounded-lg"
            >
              {video.videoType === "youtube" ? (
                <YouTubeVideoCard
                  video={video}
                  speakers={video.videosSpeakers}
                />
              ) : (
                <video src={video.videoUrl || ""} controls />
              )}
            </div>
          ))}
      </div>

      {!hideSeeMoreButton && (
        <Link href="/gallery">
          <Button variant="outline" className="mt-4 text-xs">
            Lihat semua video
          </Button>
        </Link>
      )}
    </div>
  );
}
