import { TypographyH4 } from "@/components/ui/typography";
import { localeDate } from "@/lib/utils";
import { ImageIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ article }: { article: any }) {
  const author = article.authors.length > 0 ? article.authors[0] : null;

  return (
    <div className="group mb-2">
      <div className="overflow-hidden rounded-md transition-all hover:scale-[1.025]">
        <Link
          href={`/articles/${article.slug}`}
          className="relative block aspect-video"
        >
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              priority={false}
              className="object-cover transition-all"
              fill
              sizes="(max-width: 768px) 30vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full border rounded-t-md">
              <ImageIcon className="h-12 w-12 text-gray-200" />
            </div>
          )}
        </Link>

        <div className="flex items-center mt-2">
          <TypographyH4 className="font-normal text-md">
            <Link href={`/articles/${article.slug}`}>
              <span className="bg-gradient-to-r from-gray-200 to-gray-50 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_2px] group-hover:bg-[length:100%_5px]">
                {article.title}
              </span>
            </Link>
          </TypographyH4>
        </div>

        {author && (
          <div className="mt-2 flex items-center space-x-2 text-gray-500">
            <Link href={`/${author.user.username}`} className="text-sm">
              <div className="flex gap-2">
                <Image
                  src={author.user.image || ""}
                  alt={author.user.name || ""}
                  width={20}
                  height={20}
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
        )}
      </div>
    </div>
  );
}
