import { auth } from "@/auth";
import ArticlePage from "@/components/articles/article-page";
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
    description: `Baca artikel ${article.title} yang ditulis oleh ${authors} di Palembang Digital`,
    keywords: article.keywords
      ? article.keywords + ","
      : "" +
        "Artikel,Informasi,Blog,Palembang,Programming,Design,UI/UX,AI,Startup",
    openGraph: {
      title: `${article.title} · Palembang Digital`,
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
        scrollTitle={article.title}
        goBackLink="/articles"
      />
      <div className="content-wrapper">
        <div className="content">
          <ArticlePage article={article} />
        </div>
      </div>
    </ScrollArea>
  );
}
