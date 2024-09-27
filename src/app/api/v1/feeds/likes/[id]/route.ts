import { auth } from "@/auth";
import { db } from "@/db";
import { feedsLikes } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: { id: number } }
) {
  const session = await auth();
  if (!session?.user && !session?.user?.id) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const feedId = params.id;
  const user = session.user;

  const inputFeedLike = {
    feedId: feedId,
    userId: user.id as string,
  };

  await db.transaction(async (tx) => {
    const result = await tx
      .insert(feedsLikes)
      .values(inputFeedLike)
      .returning();
    if (result.length === 0) {
      return Response.json({ message: "Failed to like post" }, { status: 500 });
    }
  });

  return Response.json({ message: "Success" });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  const session = await auth();
  if (!session?.user && !session?.user?.id) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const feedId = params.id;
  const userId = session.user.id as string;

  await db.transaction(async (tx) => {
    const result = await tx
      .delete(feedsLikes)
      .where(and(eq(feedsLikes.feedId, feedId), eq(feedsLikes.userId, userId)))
      .returning();
    if (result.length === 0) {
      return Response.json(
        { message: "Failed to unlike post" },
        { status: 500 }
      );
    }
  });

  return Response.json({ message: "Success" });
}
