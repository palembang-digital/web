"use client";

import AdUnit from "@/components/ad-unit";
import ArticleCard from "@/components/articles/article-card";
import { TypographyH2 } from "@/components/ui/typography";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function ArticleList({ limit = 10 }) {
  const { data, isLoading } = useSWR(
    `/api/v1/articles?limit=${limit}`,
    fetcher
  );

  if (isLoading) {
    return <div className="p-6">Loading our thoughtful writings...</div>;
  }

  return (
    <div>
      <p className="italic text-neutral-400">Our writings</p>
      <TypographyH2>Artikel</TypographyH2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
        {data &&
          data.map((article: any) => (
            <ArticleCard key={article.id} article={article} />
          ))}
      </div>
      <div className="my-6">
        <AdUnit />
      </div>
    </div>
  );
}
