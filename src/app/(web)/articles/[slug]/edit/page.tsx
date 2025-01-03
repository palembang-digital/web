import { auth } from "@/auth";
import EditArticleForm from "@/components/articles/edit-article-form";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { getArticle } from "@/services";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) {
    return {
      title: "Article not found",
    };
  }

  const authors = article.authors.map((author) => author.user.name).join(", ");

  return {
    title: article.title,
    openGraph: {
      title: `Sunting ${article.title} · Palembang Digital`,
      description: `Ditulis oleh ${authors}`,
      images: `/articles/${params.slug}/og.png`,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await auth();

  const article = await getArticle(params.slug);
  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader
        session={session}
        scrollTitle="Artikel"
        goBackLink="/articles"
      />
      <div className="content-wrapper">
        <div className="content">
          {session && <EditArticleForm session={session} article={article} />}
        </div>
      </div>
    </ScrollArea>
  );
}
