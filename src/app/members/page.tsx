import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import MemberCard from "@/components/members/member-card";
import { ScrollArea } from "@/components/scroll-area";
import { getUsers, mergeUserEvents } from "@/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anggota",
};

export default async function Page() {
  const session = await auth();

  const users = await getUsers();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Anggota" />
      <div className="content-wrapper">
        <div className="content">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-3 justify-items-center">
            {users.map((user) => {
              const events = mergeUserEvents(user).map((event: any) => ({
                id: event.id,
                label: event.name,
                href: `/events/${event.id}`,
                image: event.imageUrl,
                imageClassName: "rounded-sm",
              }));

              return (
                <MemberCard
                  key={user.id}
                  user={user}
                  events={events}
                  eventShownLimit={5}
                />
              );
            })}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
