import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypographyH4 } from "@/components/ui/typography";
import Link from "next/link";

function EventCommittees({ committees }: { committees: any[] }) {
  return (
    <div>
      <TypographyH4>Panitia</TypographyH4>
      <div className="flex flex-wrap gap-2 my-4">
        {committees
          .sort((a: any, b: any) => a.user.name.localeCompare(b.user.name))
          .map(({ user }) => (
            <Link href={`/${user.username}`} key={user.id}>
              <div className="flex items-center gap-2">
                <Avatar className="rounded-full h-6 w-6">
                  <AvatarImage src={user.image || ""} alt={user.name || ""} />
                  <AvatarFallback>{user.name || ""}</AvatarFallback>
                </Avatar>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default EventCommittees;
