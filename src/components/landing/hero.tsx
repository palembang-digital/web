import { auth } from "@/auth";
import { Boxes } from "@/components/aceternityui/background-boxes";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
import Link from "next/link";

export default async function Hero({
  memberCount,
  eventCount,
  startupCount,
  organizationCount,
}: {
  memberCount?: number;
  eventCount?: number;
  startupCount?: number;
  organizationCount?: number;
}) {
  const session = await auth();

  const stats = [
    {
      title: "Kegiatan",
      value: eventCount,
      href: "/events",
    },
    {
      title: "Anggota",
      value: memberCount,
      href: "/members",
    },
    {
      title: "Startup",
      value: startupCount,
      href: "/ecosystem",
    },
    {
      title: "Organisasi",
      value: organizationCount,
      href: "/ecosystem",
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 py-8">
      <Boxes />

      <TypographyH1 className="z-10 whitespace-pre-wrap text-center text-neutral-900 lg:text-4xl">
        Dari wong kito, untuk wong kito!
      </TypographyH1>

      <p className="z-10 text-center">
        <strong>Palembang Digital (Patal)</strong> adalah platform komunitas
        terbesar di Sumatera Selatan untuk tumbuh bersama di bidang IT.
      </p>

      <div className="z-10 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {stats.map(
          (stat) =>
            stat.value && (
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
            )
        )}
      </div>

      {session ? (
        <Link href="/events" className="z-10">
          <Button>Explore our events!</Button>
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
