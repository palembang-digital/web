"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Image from "@/packages/components/base/Images/Image";
import { SkeletonCard } from "@/packages/components/base/Skeleton/SkeletonCard";
import { Card, CardContent, CardHeader } from "@/packages/components/ui/card";

function Events({ limit = 5 }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const FormatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    let days = day;
    if (day < 10) {
      days = `0${days}`;
    } else {
      days = day;
    }
    const dateFormat = `${days} ${monthNames[month]} ${year}`;
    return dateFormat;
  };

  const FormatDateEvent = (scheduledEnd) => {
    const date = new Date(scheduledEnd);
    const dateEvent = FormatDate(date);
    return dateEvent;
  };

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
        .slice(0, limit)
        .map((event, idx) => (
          <Link key={idx} href={`/events/${event.id}`}>
            <Card className="w-[200px]">
              <CardHeader>
                <Image className="object-cover " src={event.imageUrl} />
              </CardHeader>
              <CardContent className="text-muted-foreground flex flex-col text-sm">
                <p>{FormatDateEvent(event.scheduledEnd)}</p>
                <p className="truncate text-lg font-bold text-black">
                  {event.name}
                </p>
                <p>tempat</p>
              </CardContent>
            </Card>
          </Link>
        ))}
    </div>
  );
}

export default Events;
