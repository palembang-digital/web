import { TypographyH2 } from "@/components/ui/typography";
import YouTubeVideoCard from "@/components/youtube-video-card";

export default function Videos({ videos }: { videos: any[] }) {
  return (
    <div className="p-6">
      <p className="italic text-neutral-400">Videos</p>
      <TypographyH2 className="text-neutral-800 mb-2">Galeri</TypographyH2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-background hover:bg-accent hover:cursor-pointer shadow-sm flex h-full border rounded-lg"
          >
            {video.videoType === "youtube" ? (
              <YouTubeVideoCard video={video} speakers={video.videosSpeakers} />
            ) : (
              <video src={video.videoUrl || ""} controls />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
