import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  const videos = await db.query.videos.findMany({
    orderBy: (videos, { desc }) => [desc(videos.publishedAt)],
  });

  return NextResponse.json(videos);
}
