"use client";

import Image from "@/packages/components/base/Images/Image";
import { SkeletonCard } from "@/packages/components/base/Skeleton/SkeletonCard";
import { Card, CardContent, CardFooter } from "@/packages/components/ui/card";
import { useEffect, useState } from "react";

function Events() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <div className="flex gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  if (!data) return <p>What!? No events!? 😱</p>;

  return (
    <div className="flex gap-6">
      {data.payload
        .sort(
          (a, b) =>
            Date.now() -
            new Date(a.scheduledStart) -
            (Date.now() - new Date(b.scheduledStart))
        )
        .slice(0, 5)
        .map((event, idx) => (
          <Card key={idx}>
            <CardContent>
              <Image className="object-cover" src={event.imageUrl} size={200} />
            </CardContent>
            <CardFooter>
              <p>{event.name}</p>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}

export default Events;
