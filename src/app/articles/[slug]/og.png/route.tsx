import { OpenGraphImage } from "@/components/og-image";
import { getArticle } from "@/services";
import { ImageResponse } from "next/og";

export async function GET(_: any, { params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  if (!article) {
    return new ImageResponse(<></>, { status: 404 });
  }

  const authors = article.authors.map((author) => author.user.name).join(", ");

  return new ImageResponse(
    (
      <OpenGraphImage
        title={article.title}
        description={`Ditulis oleh ${authors}`}
        url="articles"
      />
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
