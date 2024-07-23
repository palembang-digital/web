import { auth } from "@/auth";
import GridPattern from "@/components/magicui/grid-pattern";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
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
      title: "Anggota",
      value: memberCount,
    },
    {
      title: "Kegiatan",
      value: eventCount,
    },
    {
      title: "Startup",
      value: startupCount,
    },
    {
      title: "Organisasi",
      value: organizationCount,
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 py-8">
      <GridPattern
        width={15}
        height={15}
        className={cn(
          "[mask-image:radial-gradient(ellipse,white,transparent)]"
        )}
      />

      <TypographyH1 className="z-10 whitespace-pre-wrap text-center text-neutral-900 lg:text-4xl">
        Dari wong kito, untuk wong kito!
      </TypographyH1>

      <p className="z-10 text-center">
        <strong>Palembang Digital (Patal)</strong> adalah platform komunitas
        terbesar di Sumatera Selatan untuk tumbuh bersama di bidang IT.
      </p>

      <div className="z-10 grid grid-cols-3 gap-2">
        {stats.map(
          (stat) =>
            stat.value && (
              <Card
                key={stat.title}
                className="border-none shadow-none text-center bg-neutral-100"
              >
                <CardContent className="p-6">
                  <div className="text-2xl text-neutral-700 font-bold">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-500">{stat.title}</div>
                </CardContent>
              </Card>
            )
        )}
      </div>

      {session ? (
        <Link href="/events" className="z-10">
          <Button>Explore our events!</Button>
        </Link>
      ) : (
        <Link href="/api/auth/signin" className="z-10">
          <Button>Bergabung sekarang!</Button>
        </Link>
      )}
    </div>
  );
}
