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
          {/* <Input placeholder="Post something new" />
          <Button>Post</Button> */}
          <NewPostForm />
          {feeds.map((feed) => (
            <div key={feed.id} className="mt-8">
              <PostCard content={feed.content} />
              <div>{feed.user.name}</div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
