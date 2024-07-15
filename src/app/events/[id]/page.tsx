import EventCard from "@//components/events/event-card";
import { db } from "@//db";
import { auth } from "@/auth";
import Link from "next/link";

export default async function Page({ params }: { params: { id: number } }) {
  const session = await auth();

  const event = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.id, params.id),
  });

  return (
    <>
      <EventCard event={event} />
      {/* @ts-ignore */}
      {session && session.user?.role === "administrator" && (
        <Link href={`/events/${params.id}/edit`}>Edit</Link>
      )}
    </>
  );
}
