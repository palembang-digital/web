"use client";

import NewCommentForm from "@/app/for-you/new-comment-form";
import Loading from "@/app/loading";
import "@/components/minimal-tiptap/styles/index.css";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { fetcher } from "@/lib/fetcher";
import { timeAgo } from "@/lib/utils";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";

export default function PostCard({
  feed,
  user,
}: Readonly<{ feed: any; user: any }>) {
  const { mutate } = useSWRConfig();

  const [shouldFetch, setShouldFetch] = useState(false);
  const { data: comments, isLoading: loadingComments } = useSWR(
    shouldFetch ? `/api/v1/feeds/${feed.id}/comments` : null,
    fetcher
  );

  const likePost = (feedId: number) => async () => {
    try {
      const response = await fetch(`/api/v1/feeds/likes/${feedId}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("You liked this post!");
        mutate("/api/v1/feeds");
      } else {
        toast.error("Failed to like post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const unlikePost = (feedId: number) => async () => {
    try {
      const response = await fetch(`/api/v1/feeds/likes/${feedId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("You unliked this post!");
        mutate("/api/v1/feeds");
      } else {
        toast.error("Failed to unlike post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isUserLiked =
    user &&
    feed.likes.length > 0 &&
    feed.likes.some((like: any) => like.userId === user.id);

  const likedBy =
    feed.likes &&
    feed.likes.map(({ user }: { user: any }) => ({
      id: user.id,
      label: user.name,
      image: user.image,
      imageClassName: "h-5 w-5",
      href: `/${user.username}`,
    }));

  const likedByShownLimit = 5;

  const commentedBy = feed.comments;

  const formatContent = (content: string) => {
    let output = content.replaceAll("\n", "<br/>");
    output = output.replaceAll(
      /@([a-zA-Z0-9_-]+)/g,
      '<a class="font-medium hover:underline" href="/$1">@$1</a>'
    );
    return output;
  };

  return (
    <Sheet onOpenChange={() => setShouldFetch(!shouldFetch)}>
      <div className="flex flex-col border-b pb-6 gap-4">
        {/* User */}
        <div className="flex items-center gap-2">
          <Link href={feed.user.username}>
            <Avatar className="h-6 w-6">
              <AvatarImage src={feed.user.image || ""} />
            </Avatar>
          </Link>
          <Link href={feed.user.username}>
            <p className="text-xs font-semibold">{feed.user.name}</p>
          </Link>
          <Link href={feed.user.username} className="hidden sm:block">
            <p className="text-xs text-neutral-500">@{feed.user.username}</p>
          </Link>
          <p className="text-xs text-neutral-500">·</p>
          <p className="text-xs text-neutral-500">{timeAgo(feed.createdAt)}</p>
        </div>

        {/* Content */}
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: formatContent(feed.content),
          }}
        />

        {/* Actions */}
        <div className="flex items-center">
          {isUserLiked ? (
            <>
              <HeartIcon
                className="mr-1 h-5 w-5 hover:cursor-pointer hover:animate-pulse"
                color="#fb7185"
                fill="#fb7185"
                onClick={unlikePost(feed.id)}
              />
            </>
          ) : (
            <HeartIcon
              className="mr-1 h-5 w-5 hover:cursor-pointer hover:animate-pulse"
              strokeWidth={1.5}
              onClick={likePost(feed.id)}
            />
          )}
          {likedBy.length > 0 && (
            <p className="text-xs text-neutral-500">{likedBy.length}</p>
          )}

          <SheetTrigger asChild>
            <MessageCircleIcon
              className="ml-4 h-5 w-5 hover:cursor-pointer hover:animate-pulse"
              strokeWidth={1.5}
            />
          </SheetTrigger>
          {commentedBy.length > 0 && (
            <p className="text-xs text-neutral-500 ml-1">
              {commentedBy.length}
            </p>
          )}
        </div>

        {/* Liked by */}
        {likedBy.length > 0 && (
          <div className="flex items-center">
            <p className="text-xs text-neutral-500">Disukai oleh</p>
            <div className="flex ml-1">
              <AnimatedTooltip items={likedBy.slice(0, likedByShownLimit)} />
            </div>
            {likedBy.length > likedByShownLimit && (
              <p className="text-xs text-neutral-500 ml-3">
                dan {likedBy.length - likedByShownLimit} lainnya
              </p>
            )}
          </div>
        )}
      </div>

      <SheetContent className="w-10/12 sm:w-1/2 sm:max-w-1/2 overflow-auto">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-2">
              <Link href={feed.user.username}>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={feed.user.image || ""} />
                </Avatar>
              </Link>
              <Link href={feed.user.username}>
                <p className="text-xs font-semibold">{feed.user.name}</p>
              </Link>
              <Link href={feed.user.username} className="hidden sm:block">
                <p className="text-xs text-neutral-500">
                  @{feed.user.username}
                </p>
              </Link>
              <p className="text-xs text-neutral-500">·</p>
              <p className="text-xs text-neutral-500">
                {timeAgo(feed.createdAt)}
              </p>
            </div>
          </SheetTitle>
        </SheetHeader>

        <SheetDescription></SheetDescription>

        <div className="flex flex-col gap-4 mt-4">
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html: formatContent(feed.content),
            }}
          />

          <div className="flex items-center">
            {isUserLiked ? (
              <>
                <HeartIcon
                  className="mr-1 h-5 w-5 hover:cursor-pointer hover:animate-pulse"
                  color="#fb7185"
                  fill="#fb7185"
                  onClick={unlikePost(feed.id)}
                />
              </>
            ) : (
              <HeartIcon
                className="mr-1 h-5 w-5 hover:cursor-pointer hover:animate-pulse"
                strokeWidth={1.5}
                onClick={likePost(feed.id)}
              />
            )}
            {likedBy.length > 0 && (
              <p className="text-xs text-neutral-500">{likedBy.length}</p>
            )}

            <MessageCircleIcon
              className="ml-4 h-5 w-5 hover:cursor-pointer hover:animate-pulse"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {loadingComments && <Loading />}

        {comments &&
          comments.map((comment: any) => (
            <div
              key={comment.id}
              className="flex flex-col gap-2 border-t mt-4 pt-4"
            >
              <div className="flex items-center gap-2">
                <Link href={comment.user.username}>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={comment.user.image || ""} />
                  </Avatar>
                </Link>

                <Link href={comment.user.username}>
                  <p className="text-xs font-semibold">{comment.user.name}</p>
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

        <div className="border-t mt-4 pt-4">
          <NewCommentForm feedId={feed.id} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
