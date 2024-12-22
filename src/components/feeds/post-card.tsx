"use client";

import "@/components/minimal-tiptap/styles/index.css";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatContent, timeAgo } from "@/lib/utils";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PostCard({
  feed,
  user,
}: Readonly<{ feed: any; user: any }>) {
  const router = useRouter();

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
        router.refresh();
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
        router.refresh();
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
      imageClassName: "h-4 w-4",
      href: `/${user.username}`,
    }));

  const likedByShownLimit = 5;

  const commentedBy = feed.comments;

  return (
    <div className="flex flex-col border-b pb-6 gap-4">
      {/* User */}
      <div className="flex items-center gap-2">
        <Link href={feed.user.username}>
          <Avatar className="h-6 w-6">
            <AvatarImage src={feed.user.image || ""} />
          </Avatar>
        </Link>
        <Link href={feed.user.username} className="text-xs font-semibold">
          {feed.user.name}
        </Link>
        <Link href={feed.user.username} className="hidden sm:block">
          <p className="text-xs text-neutral-500">@{feed.user.username}</p>
        </Link>
        <p className="text-xs text-neutral-500">·</p>
        <p className="text-xs text-neutral-500">
          {typeof feed.createdAt === "string" ||
          feed.createdAt instanceof String
            ? timeAgo(feed.createdAt)
            : timeAgo(feed.createdAt.toISOString())}
        </p>
      </div>

      {/* Content */}
      <Link
        href={`/${feed.user.username}/posts/${feed.id}`}
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
              className="mr-1 h-4 w-4 hover:cursor-pointer hover:animate-pulse"
              color="#fb7185"
              fill="#fb7185"
              onClick={unlikePost(feed.id)}
            />
          </>
        ) : (
          <HeartIcon
            className="mr-1 h-4 w-4 hover:cursor-pointer hover:animate-pulse"
            strokeWidth={1.5}
            onClick={likePost(feed.id)}
          />
        )}
        {likedBy.length > 0 && (
          <p className="text-xs text-neutral-500">{likedBy.length}</p>
        )}

        <Link href={`/${feed.user.username}/posts/${feed.id}`}>
          <MessageCircleIcon
            className="ml-4 h-4 w-4 hover:cursor-pointer hover:animate-pulse"
            strokeWidth={1.5}
          />
        </Link>
        {commentedBy.length > 0 && (
          <p className="text-xs text-neutral-500 ml-1">{commentedBy.length}</p>
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
  );
}
