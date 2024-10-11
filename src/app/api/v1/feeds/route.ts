import { auth } from "@/auth";
import { db } from "@/db";
import { feeds } from "@/db/schema";
import { getFeeds } from "@/services/feeds";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const feeds = await getFeeds();

  return NextResponse.json(feeds);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user && !session?.user?.id) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const user = session.user;

  const data = await req.json();

  const inputFeed = {
    content: data.feed.content,
    userId: user.id as string,
  };

  await db.transaction(async (tx) => {
    const result = await tx.insert(feeds).values(inputFeed).returning();
    if (result.length === 0) {
      return Response.json(
        { message: "Failed to create a new post" },
        { status: 500 }
      );
    }
  });

  return Response.json({ message: "Success" });
}
