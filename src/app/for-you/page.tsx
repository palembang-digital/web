import NewPostForm from "@/app/for-you/new-post-form";
import PostCard from "@/app/for-you/post-card";
import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { TypographyH2 } from "@/components/ui/typography";
import { getFeeds } from "@/services/feeds";

export default async function Page() {
  const session = await auth();

  const feeds = await getFeeds();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="For You" />
      <div className="content-wrapper">
        <div className="content">
          <TypographyH2 className="text-neutral-800">For You</TypographyH2>

          {session && <NewPostForm />}
          <div className="flex flex-col gap-6 mt-6">
            {feeds.map((feed: any) => (
              <PostCard key={feed.id} feed={feed} user={session?.user} />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
