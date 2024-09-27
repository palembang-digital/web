"use client";

import useMinimalTiptapEditor from "@/components/minimal-tiptap/hooks/use-minimal-tiptap";
import "@/components/minimal-tiptap/styles/index.css";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditorContent } from "@tiptap/react";
import { ThumbsUpIcon } from "lucide-react";
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
      href: `/${user.username}`,
    }));

  const likedByShownLimit = 5;

  return (
    <div key={feed.id}>
      <div className="flex border p-4 rounded-md">
        <Avatar>
          <AvatarImage src={feed.user.image || ""} />
        </Avatar>
        <div className="flex flex-col ml-2">
          <p className="text-xs font-bold">{feed.user.name}</p>
          <EditorContent className="minimal-tiptap-editor" editor={editor} />
          <div className="flex items-center">
            {likedBy && (
              <AnimatedTooltip items={likedBy.slice(0, likedByShownLimit)} />
            )}
            {likedBy.length > 0 && (
              <p className="text-xs text-neutral-400 ml-3">
                {likedBy.length > likedByShownLimit &&
                  `+${likedBy.length} - ${likedByShownLimit} `}
                liked this
              </p>
            )}
          </div>
          <div className="flex gap-2 mt-2 items-center">
            {isUserLiked ? (
              <Button variant="ghost" size="sm" onClick={unlikePost(feed.id)}>
                <ThumbsUpIcon className="mr-2 h-4 w-4" />
                Unlike
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={likePost(feed.id)}>
                <ThumbsUpIcon className="mr-2 h-4 w-4" />
                Like
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
