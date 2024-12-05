import { auth } from "@/auth";
import { db } from "@/db";
import { feedsComments } from "@/db/schema";
import { getFeedComments } from "@/services/feed-comments";
import { answerQuestionTask } from "@/trigger/patal-bot";
import { tasks } from "@trigger.dev/sdk/v3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const comments = await getFeedComments(params.id);

  return NextResponse.json(comments);
}

export async function POST(
  req: Request,
  { params }: { params: { id: number } }
) {
  const session = await auth();
  if (!session?.user && !session?.user?.id) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const user = session.user;

  const data = await req.json();

  const inputComment = {
    comment: data.comment.comment,
    userId: user.id as string,
    feedId: params.id,
  };

  await db.transaction(async (tx) => {
    const result = await tx
      .insert(feedsComments)
      .values(inputComment)
      .returning();
    if (result.length === 0) {
      return Response.json(
        { message: "Failed to create a new comment" },
        { status: 500 }
      );
    }
  });

  if (inputComment.comment.includes("@patal-bot")) {
    await tasks.trigger<typeof answerQuestionTask>(
      "patal-bot-answer-question",
      { feedId: params.id, query: inputComment.comment, user: user }
    );
  }

  return Response.json({ message: "Success" });
}
