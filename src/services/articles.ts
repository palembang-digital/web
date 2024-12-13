import { db } from "@/db";
import { cache } from "react";

export const getArticles = cache(
  async ({ where, limit = 10 }: { where?: any; limit?: number }) => {
    const articles = await db.query.articles.findMany({
      where: (articles, { eq }) => eq(articles.status, "published"),
      limit: limit,
      orderBy: (articles, { desc }) => [desc(articles.createdAt)],
      with: {
        authors: {
          with: {
            user: {
              columns: { id: true, name: true, username: true, image: true },
            },
          },
        },
      },
    });
    return articles;
  }
);

export const getArticle = cache(async (slug: string) => {
  const article = await db.query.articles.findFirst({
    where: (articles, { eq }) => eq(articles.slug, slug),
    with: {
      authors: {
        with: {
          user: {
            columns: { id: true, name: true, username: true, image: true },
          },
        },
      },
    },
  });
  return article;
});
