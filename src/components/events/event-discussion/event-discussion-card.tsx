"use client";

import "@/components/minimal-tiptap/styles/index.css";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

const formatContent = (content: string) => {
  let output = content.replaceAll("\n", "<br/>");
  output = output.replaceAll(
    /@([a-zA-Z0-9_-]+)/g,
    '<a class="font-medium hover:underline" href="/$1">@$1</a>'
  );
  return output;
};

export default function EventDiscussionCard({
  session,
  event,
  discussion,
  comments,
}: {
  session: any;
  event: any;
  discussion: any;
  comments: any[];
}) {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const postComment = async () => {
    setLoading(true);

    const requestData = {
      user: session?.user,
      content: comment,
      parentId: discussion.id,
    };

    try {
      const response = await fetch(`/api/v1/events/${event.id}/discussion`, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Comment posted!");
        router.push(`/events/${event.id}`);
        setComment("");
        mutate(`/api/v1/events/${event.id}/discussion`);
      } else {
        toast.error("Failed to post comment");
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col border rounded-lg">
      <div className="flex flex-col p-4 gap-2">
        <div className="flex items-center gap-2">
          <Link href={`/${discussion.user.username}`}>
            <Avatar className="h-6 w-6">
              <AvatarImage src={discussion.user.image || ""} />
            </Avatar>
          </Link>
          <Link href={`/${discussion.user.username}`}>
            <p className="text-xs font-semibold">{discussion.user.name}</p>
          </Link>
          <p className="text-xs text-neutral-500">·</p>
          <p className="text-xs text-neutral-500 grow">
            {timeAgo(discussion.createdAt)}
          </p>
          {/* {session?.user.id === discussion.user.id && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <DotsVerticalIcon className="w-4 h-4 text-neutral-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => console.log("HAPUS")}>
                  Hapus diskusi
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )} */}
        </div>
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: formatContent(discussion.content),
          }}
        />
      </div>

      <Separator />

      <div className="flex flex-col gap-4 p-4 bg-accent">
        {comments
          .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
          .map((comment) => (
            <div key={comment.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Link href={`/${comment.user.username}`}>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={comment.user.image || ""} />
                  </Avatar>
                </Link>
                <Link href={`/${comment.user.username}`}>
                  <p className="text-xs font-semibold">{comment.user.name}</p>
                </Link>
                <p className="text-xs text-neutral-500">·</p>
                <p className="text-xs text-neutral-500 grow">
                  {timeAgo(comment.createdAt)}
                </p>
                {/* {session?.user.id === comment.user.id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <DotsVerticalIcon className="w-4 h-4 text-neutral-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => console.log("HAPUS")}>
                        <DeleteEventDiscussionDialog
                          title="Hapus komentar"
                          description="Apakah kamu yakin mau menghapus komentar ini?"
                        />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )} */}
              </div>
              <p
                className="text-sm mb-2"
                dangerouslySetInnerHTML={{
                  __html: formatContent(comment.content),
                }}
              />
              <Separator />
            </div>
          ))}

        {session && (
          <div className="flex gap-2 w-full">
            <Avatar className="h-6 w-6">
              <AvatarImage src={session?.user.image || ""} />
            </Avatar>
            <div className="flex w-full space-x-2">
              <Textarea
                className="bg-white"
                placeholder="Tulis komentar di sini"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={loading}
              />
              <Button
                onClick={() => postComment()}
                disabled={loading || comment.length === 0}
                variant="outline"
              >
                Kirim
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
