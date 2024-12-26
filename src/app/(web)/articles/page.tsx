import { auth } from "@/auth";
import ArticleList from "@/components/articles/article-list";
import { FloatingHeader } from "@/components/floating-header";
import { GradientBg3 } from "@/components/gradient-bg";
import { ScrollArea } from "@/components/scroll-area";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel",
  description:
    "Tulisan-tulisan informatif dan bermanfaat dari komuntias Palembang Digital",
  keywords:
    "Artikel,Informasi,Blog,Programming,Design,UI/UX,AI,Startup,Palembang,Palembang Digital",
};

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Page() {
  const session = await auth();

  return (
    <ScrollArea useScrollAreaId>
      <GradientBg3 />
      <FloatingHeader session={session} scrollTitle="Artikel" />
      <div className="content-wrapper">
        <div className="content">
          <ArticleList />
        </div>
      </div>
    </ScrollArea>
  );
}
