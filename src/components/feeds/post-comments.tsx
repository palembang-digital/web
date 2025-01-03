"use client";

import Loading from "@/app/loading";
import NewCommentForm from "@/components/feeds/new-comment-form";
import "@/components/minimal-tiptap/styles/index.css";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { fetcher } from "@/lib/fetcher";
import { formatContent, timeAgo } from "@/lib/utils";
import Link from "next/link";
import useSWR from "swr";

export default function PostComments({ feed }: Readonly<{ feed: any }>) {
  const { data: comments, isLoading } = useSWR(
    `/api/v1/feeds/${feed.id}/comments`,
    fetcher
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {comments &&
        comments.map((comment: any) => (
          <div
            key={comment.id}
            className="flex flex-col gap-2 border-b my-6 pb-6"
          >
            <div className="flex items-center gap-2">
              <Link href={`/${comment.user.username}`}>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={comment.user.image || ""} />
                </Avatar>
              </Link>

              <Link
                href={`/${comment.user.username}`}
                className="text-xs font-semibold"
              >
                {comment.user.name}
              </Link>
              <p className="text-xs text-neutral-500">·</p>
              <p className="text-xs text-neutral-500">
                {timeAgo(comment.createdAt)}
              </p>
            </div>
            <p
              className="text-sm"
              dangerouslySetInnerHTML={{
                __html: formatContent(comment.comment),
              }}
            />
          </div>
        ))}

      <div className="mt-6">
        <NewCommentForm feedId={feed.id} />
      </div>
    </>
  );
}
