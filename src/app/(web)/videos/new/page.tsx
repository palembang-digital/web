import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import NotAuthenticated from "@/components/not-authenticated";
import PageTitle from "@/components/page-title";
import { ScrollArea } from "@/components/scroll-area";
import EditVideoForm from "@/components/videos/edit-video-form";

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  // @ts-ignore
  if (!session || session.user?.role !== "administrator") {
    return <NotAuthenticated />;
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="New video" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="New video" />
          <EditVideoForm video={{}} />
        </div>
      </div>
    </ScrollArea>
  );
}
