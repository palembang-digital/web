"use client";

import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import YouTubeVideoCard from "@/components/youtube-video-card";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import useSWR from "swr";
import AdUnit from "../ad-unit";

export default function Videos({
  hideSeeMoreButton,
  limit = 1000,
  showAds = false,
}: {
  hideSeeMoreButton?: boolean;
  limit?: number;
  showAds?: boolean;
}) {
  const { data, isLoading } = useSWR(`/api/v1/videos?limit=${limit}`, fetcher);

  if (isLoading) {
    return <div className="p-6">Loading our core memories...</div>;
  }

  return (
    <div className="p-2 sm:p-6">
      <p className="italic text-neutral-400">Videos</p>
      <TypographyH2 className="text-neutral-800 mb-2">Galeri</TypographyH2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {data &&
          data.map((video: any, index: number) => (
            <>
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

              {showAds && index > 0 && index % 25 === 0 && (
                <div key={index} className="border rounded-md p-2 h-full">
                  <AdUnit
                    className="h-full"
                    format="fluid"
                    layoutKey="-7v+eo+0+2+1"
                    slot="4504827616"
                  />
                </div>
              )}
            </>
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
