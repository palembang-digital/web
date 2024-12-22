import { auth } from "@/auth";
import AdUnit from "@/components/ad-unit";
import EventList from "@/components/events/event-list";
import { FloatingHeader } from "@/components/floating-header";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { ScrollArea } from "@/components/scroll-area";
import { SignIn } from "@/components/sign-in";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kegiatan",
};

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Page() {
  const session = await auth();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Kegiatan Patal" />
      <div className="content-wrapper">
        <div className="content">
          <div className="p-2 sm:p-6">
            {session ? (
              <Link href="/events/new">
                <ShimmerButton>
                  <span className="whitespace-pre-wrap text-center text-xs font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
                    Punya kegiatan seru? Tambahkan sekarang!
                  </span>
                </ShimmerButton>
              </Link>
            ) : (
              <SignIn
                className="text-xs"
                text="Masuk untuk menambahkan kegiatan seru kamu"
              />
            )}
          </div>

          <EventList showAds={true} />

          <div className="p-2 sm:p-6">
            <AdUnit />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
