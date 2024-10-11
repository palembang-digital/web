"use client";

import PostCard from "@/app/for-you/post-card";
import Loading from "@/app/loading";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function FeedList({ session }: { session: any }) {
  const { data, isLoading } = useSWR(`/api/v1/feeds`, fetcher);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-6 mt-8">
      {data.map((feed: any) => (
        <PostCard key={feed.id} feed={feed} user={session?.user} />
      ))}
    </div>
  );
}
