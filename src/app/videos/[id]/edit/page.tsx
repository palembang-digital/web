import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import NotAuthenticated from "@/components/not-authenticated";
import { ScrollArea } from "@/components/scroll-area";
import EditVideoForm from "@/components/videos/edit-video-form";
import { db } from "@/db";

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  // @ts-ignore
  if (!session || session.user?.role !== "administrator") {
    return <NotAuthenticated />;
  }

  const video = await db.query.videos.findFirst({
    where: (videos, { eq }) => eq(videos.id, params.id),
    with: {
      eventsVideos: {
        with: {
          event: {
            columns: { id: true, name: true, description: true },
          },
        },
      },
      videosSpeakers: {
        with: {
          user: {
            columns: { id: true, name: true, username: true },
          },
        },
      },
    },
  });

  if (!video) {
    return (
      <ScrollArea useScrollAreaId>
        <FloatingHeader session={session} scrollTitle="Video tidak ditemukan" />
        <p>Video not found</p>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Edit video" />
      <div className="content-wrapper">
        <div className="content">
          <EditVideoForm video={video} />
        </div>
      </div>
    </ScrollArea>
  );
}
