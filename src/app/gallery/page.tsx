import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import Videos from "@/components/videos/videos";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri",
};

export default async function Page() {
  const session = await auth();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Galeri" />
      <div className="content-wrapper">
        <div className="content">
          <Videos hideSeeMoreButton />
        </div>
      </div>
    </ScrollArea>
  );
}
