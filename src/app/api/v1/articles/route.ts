import { auth } from "@/auth";
import { db } from "@/db";
import { articles, articlesAuthors } from "@/db/schema";
import { getArticles } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  const events = await getArticles({ limit: limit });

  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const data = await req.json();

  const inputArticle = {
    ...data.article,
    status: "published",
    createdBy: session.user.id,
    updatedBy: session.user.id,
  };

  console.log(inputArticle);

  await db.transaction(async (tx) => {
    const result = await tx.insert(articles).values(inputArticle).returning();
    if (result.length === 0) {
      return Response.json(
        { message: "Failed to create article" },
        { status: 500 }
      );
    }

    const articleId = result[0].id;

    await tx.insert(articlesAuthors).values({
      articleId: articleId,
      userId: data.user.id,
    });
  });

  return Response.json({
    message: "Article created",
  });
}
