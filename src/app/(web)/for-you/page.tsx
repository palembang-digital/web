import { auth } from "@/auth";
import NewPostForm from "@/components/feeds/new-post-form";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { TypographyH2 } from "@/components/ui/typography";
import FeedList from "../../../components/feeds/feed-list";

export default async function Page() {
  const session = await auth();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="For You" />
      <div className="content-wrapper">
        <div className="content">
          <TypographyH2 className="text-neutral-800 mb-2">For You</TypographyH2>

          {session && <NewPostForm />}

          <FeedList session={session} />
        </div>
      </div>
    </ScrollArea>
  );
}
