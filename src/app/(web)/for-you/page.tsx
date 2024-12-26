import { auth } from "@/auth";
import AdUnit from "@/components/ad-unit";
import NewPostForm from "@/components/feeds/new-post-form";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { TypographyH2 } from "@/components/ui/typography";
import { Metadata } from "next";
import FeedList from "../../../components/feeds/feed-list";

export const metadata: Metadata = {
  title: "For You",
  description:
    "Ayo berbagi cerita dan pengalamanmu di Palembang Digital bersama member-member lainnya!",
};

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

          <div className="mt-6">
            <AdUnit />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
