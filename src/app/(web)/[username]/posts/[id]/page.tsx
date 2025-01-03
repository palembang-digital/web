import { auth } from "@/auth";
import PostComments from "@/components/feeds/post-comments";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { getPost } from "@/services/feeds";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PostCard = dynamic(() => import("@/components/feeds/post-card"), {
  ssr: false,
});

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const post = await getPost(params.id);
  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: `${post.user.name}: ${post.content}`,
    openGraph: {
      title: `${post.user.name} di Palembang Digital`,
      description: post.content,
      images: post.user.image ? post.user.image : undefined,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  const post = await getPost(params.id);
  if (!post) {
    return (
      <div>
        <p>Post not found</p>
      </div>
    );
  }

  const session = await auth();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader
        session={session}
        scrollTitle={post.user.name || post.user.username}
        goBackLink="/for-you"
      />
      <div className="content-wrapper">
        <div className="content">
          <PostCard feed={post} user={session?.user} />
          <PostComments feed={post} />
        </div>
      </div>
    </ScrollArea>
  );
}
