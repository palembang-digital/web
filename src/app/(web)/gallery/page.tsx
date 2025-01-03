import { auth } from "@/auth";
import AdUnit from "@/components/ad-unit";
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
      <FloatingHeader
        session={session}
        scrollTitle="Galeri"
        goBackLink="/gallery"
      />
      <div className="content-wrapper">
        <div className="content">
          <Videos hideSeeMoreButton showAds />

          <div className="p-2 sm:p-6">
            <AdUnit />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
