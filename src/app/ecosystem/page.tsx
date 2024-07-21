import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";

export default async function Page() {
  const session = await auth();

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Ekosistem" />
      <div className="content-wrapper">
        <div className="content"></div>
      </div>
    </ScrollArea>
  );
}
