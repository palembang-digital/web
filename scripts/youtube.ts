require("dotenv").config({ path: [".env.local", ".env"] });

const { db } = require("@/db");
const { videos } = require("@/db/schema");
type NewVideo = typeof videos.$inferInsert;

const API_KEY = process.env.YOUTUBE_API_KEY;
const youtube = require("@googleapis/youtube");
const client = youtube.youtube({
  version: "v3",
  auth: API_KEY,
});

async function listVideos(nextPageToken: string): Promise<NewVideo[]> {
  const res = await client.search.list({
    channelId: "UCc2Wluk3SISRSNzNlxaQ1Fw",
    maxResults: 50,
    pageToken: nextPageToken,
    part: "id,snippet",
  });

  const videos = res.data.items
    .filter((item: any) => item.id.kind === "youtube#video")
    .map((item: any) => {
      const video: NewVideo = {
        title: item.snippet.title,
        description: item.snippet.description,
        videoUrl: "https://www.youtube.com/watch?v=" + item.id.videoId,
        thumbnails: item.snippet.thumbnails,
        videoType: "youtube",
        publishedAt: new Date(item.snippet.publishedAt),
      };
      return video;
    });

  if (res.data.nextPageToken) {
    return videos.concat(await listVideos(res.data.nextPageToken));
  }

  return videos;
}

async function run() {
  const allVideos = await listVideos("");
  for (const video of allVideos) {
    console.log("Upserting video:", video.title);
    await db.insert(videos).values(video).onConflictDoNothing().returning();
  }
  // TODO: #76 Fix function/script not exiting properly
}

run().catch(console.error);
