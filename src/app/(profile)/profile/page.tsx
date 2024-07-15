import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import { SignOut } from "@/components/sign-out";

export default async function Page() {
  const session = await auth();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader
        session={session}
        scrollTitle={session?.user?.name || "Profil"}
      />
      <SignOut />
    </ScrollArea>
  );
}
