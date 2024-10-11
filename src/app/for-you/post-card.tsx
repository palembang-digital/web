"use client";

import useMinimalTiptapEditor from "@/components/minimal-tiptap/hooks/use-minimal-tiptap";
import "@/components/minimal-tiptap/styles/index.css";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import { HeartIcon } from "lucide-react";
import { toast } from "sonner";

export default function PostCard({
  feed,
  user,
}: Readonly<{ feed: any; user: any }>) {
  const editor = useMinimalTiptapEditor({
    value: feed.content,
    editable: false,
    immediatelyRender: false,
  });

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

  const likedByShownLimit = 2;

  return (
    <div className="flex flex-col border-b pb-6 gap-4">
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src={feed.user.image || ""} />
        </Avatar>
        <p className="text-xs font-medium">{feed.user.name}</p>
        <p className="text-xs text-neutral-500">{timeAgo(feed.createdAt)}</p>
      </div>

      <div className="flex flex-col">
        <EditorContent className="minimal-tiptap-editor" editor={editor} />

        <div className="flex mt-2 items-center">
          {isUserLiked ? (
            <>
              <HeartIcon
                className="mr-1 h-4 w-4 hover:cursor-pointer"
                color="#fb7185"
                fill="#fb7185"
                onClick={unlikePost(feed.id)}
              />
            </>
          ) : (
            <HeartIcon
              className="mr-1 h-4 w-4 hover:cursor-pointer"
              strokeWidth={1.5}
              onClick={likePost(feed.id)}
            />
          )}
          {likedBy.length > 0 && (
            <p className="text-xs text-neutral-500">{likedBy.length}</p>
          )}
        </div>
        {likedBy.length > 0 && (
          <div className="flex items-center mt-2">
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
    </div>
  );
}
