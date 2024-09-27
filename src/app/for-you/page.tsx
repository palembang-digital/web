import NewPostForm from "@/app/for-you/new-post-form";
import PostCard from "@/app/for-you/post-card";
import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { getFeeds } from "@/services/feeds";

export default async function Page() {
  const session = await auth();

  const feeds = await getFeeds();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="For You" />
      <div className="content-wrapper">
        <div className="content">
          For You
          <p className="text-xs">
            This feature is still under heavy development. We will delete all
            posts once the feature ready to be released.
          </p>
          <p className="text-xs">
            Until then, you are free to post anything here, as long as it&quot;s
            worth sharing.
          </p>
          {/* <Input placeholder="Post something new" />
          <Button>Post</Button> */}
          {session && <NewPostForm />}
          <div className="flex flex-col gap-4 mt-6">
            {feeds.map((feed) => (
              <PostCard key={feed.id} feed={feed} user={session?.user} />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
