import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel",
};

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Page() {
  const session = await auth();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Artikel" />
      <div className="content-wrapper">
        <div className="content"></div>
      </div>
    </ScrollArea>
  );
}
