"use client";

import MemberCard from "@/components/members/member-card";
import Marquee from "@/components/ui/marquee";
import { TypographyH2 } from "@/components/ui/typography";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function LandingMembers() {
  const { data, isLoading } = useSWR(`/api/v1/users?limit=99`, fetcher);

  if (isLoading) {
    return <div className="p-6">Loading our awesome members...</div>;
  }

  const firstRow = data.slice(0, data.length / 3);
  const secondRow = data.slice(data.length / 3, (data.length / 3) * 2);
  const thirdRow = data.slice((data.length / 3) * 2, data.length);

  return (
    <div className="p-2 sm:p-6 mt-20">
      <p className="italic text-neutral-400">Our members</p>
      <TypographyH2 className="text-neutral-800">Anggota Patal</TypographyH2>

      <div className="relative flex flex-col items-center justify-center w-full">
        <Marquee pauseOnHover className="[--duration:180s]">
          {firstRow.map((user: any) => (
            <MemberCard
              key={user.id}
              user={user}
              events={[]}
              eventShownLimit={0}
            />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:180s]">
          {secondRow.map((user: any) => (
            <MemberCard
              key={user.id}
              user={user}
              events={[]}
              eventShownLimit={0}
            />
          ))}
        </Marquee>

        <Marquee pauseOnHover className="[--duration:180s]">
          {thirdRow.map((user: any) => (
            <MemberCard
              key={user.id}
              user={user}
              events={[]}
              eventShownLimit={0}
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
