"use client";

import ShimmerButton from "@/components/magicui/shimmer-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH1 } from "@/components/ui/typography";
import { fetcher } from "@/lib/fetcher";
import { Session } from "next-auth";
import Link from "next/link";
import { Suspense, lazy } from "react";
import useSWR from "swr";

const Boxes = lazy(() =>
  import("@/components/aceternityui/background-boxes").then((module) => ({
    default: module.Boxes,
  }))
);

export default function Hero({ session }: { session: Session | null }) {
  const { data, isLoading } = useSWR("/api/v1/stats", fetcher);

  const stats = [
    {
      title: "Kegiatan",
      value: data?.eventsCount,
      href: "/events",
    },
    {
      title: "Video",
      value: data?.videosCount,
      href: "/gallery",
    },
    {
      title: "Anggota",
      value: data?.membersCount,
      href: "/members",
    },
    {
      title: "Organisasi",
      value: data?.orgsCount,
      href: "/ecosystem",
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 py-8">
      <Suspense>
        <Boxes className="hidden md:flex" />
      </Suspense>

      <Badge
        className="z-10 px-4 py-2 bg-green-50 text-green-700 border-green-50 font-medium"
        variant="outline"
      >
        Free Palestine&nbsp;&nbsp;🇵🇸
      </Badge>

      <TypographyH1 className="z-10 whitespace-pre-wrap text-center text-neutral-900 lg:text-4xl">
        Dari wong kito, untuk wong kito!
      </TypographyH1>

      <p className="z-10 text-center">
        <strong>Palembang Digital (Patal)</strong> adalah platform komunitas
        terbesar di Sumatera Selatan untuk tumbuh bersama di bidang IT.
      </p>

      <div className="z-10 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {isLoading ? (
          <>
            <Skeleton className="h-[100px] w-[100px]" />
            <Skeleton className="h-[100px] w-[100px]" />
            <Skeleton className="h-[100px] w-[100px]" />
            <Skeleton className="h-[100px] w-[100px]" />
          </>
        ) : (
          stats
            .filter((stat) => stat.value > 0)
            .sort((a, b) => (a.value < b.value ? 1 : -1))
            .map((stat) => (
              <Link href={stat.href} key={stat.title}>
                <Card className="border-none shadow-none hover:border hover:shadow-sm text-center bg-accent">
                  <CardContent className="p-6">
                    <div className="text-2xl text-neutral-700 font-bold">
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-500">{stat.title}</div>
                  </CardContent>
                </Card>
              </Link>
            ))
        )}
      </div>

      {session ? (
        <Link href="/events" className="z-10">
          <ShimmerButton>
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
              Explore our cool events!
            </span>
          </ShimmerButton>
        </Link>
      ) : (
        <Link href="/api/auth/signin" className="z-10">
          <ShimmerButton>
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
              Gabung sekarang!
            </span>
          </ShimmerButton>
        </Link>
      )}
    </div>
  );
}
