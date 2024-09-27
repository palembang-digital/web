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
            This feature is still under heavy development.
          </p>
          <p className="text-xs">
            Please be mindful of the content you will post here.
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
