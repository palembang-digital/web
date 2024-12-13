"use client";

import useMinimalTiptapEditor from "@/components/minimal-tiptap/hooks/use-minimal-tiptap";
import "@/components/minimal-tiptap/styles/index.css";
import { TypographyH1 } from "@/components/ui/typography";
import { localeDate } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import Image from "next/image";
import Link from "next/link";

export function ArticleContent({ content }: Readonly<{ content: string }>) {
  const editor = useMinimalTiptapEditor({
    value: content,
    editable: false,
    immediatelyRender: false,
  });

  return <EditorContent className="minimal-tiptap-editor" editor={editor} />;
}

export default function ArticlePage({ article }: { article: any }) {
  const author = article.authors.length > 0 ? article.authors[0] : null;

  return (
    <div className="flex flex-col gap-6 my-4">
      <TypographyH1 className="text-center text-lg lg:text-3xl font-medium">
        {article.title}
      </TypographyH1>

      <div className="flex gap-2 items-center justify-center w-full text-gray-600">
        <Link href={`/${author.user.username}`} className="text-sm">
          <div className="flex gap-2">
            <Image
              src={author.user.image || ""}
              alt={author.user.name || ""}
              width={24}
              height={24}
              className="rounded-full"
            />
            <p className="text-sm truncate hover:underline">
              {author.user.name}
            </p>
          </div>
        </Link>
        <span className="text-xs text-gray-300">&bull;</span>
        <time className="truncate text-sm" dateTime={article.createdAt}>
          {localeDate(new Date(article.createdAt))}
        </time>
      </div>

      <div className="flex items-center justify-center">
        {article.coverImage && (
          <Image
            src={article.coverImage}
            alt={article.title}
            loading="eager"
            className="rounded-lg aspect-video object-cover"
            width={768}
            height={768}
          />
        )}
      </div>

      <div className="mx-auto max-w-screen-md mt-2">
        <ArticleContent content={article.content} />
      </div>
    </div>
  );
}
