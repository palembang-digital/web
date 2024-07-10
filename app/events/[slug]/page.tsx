import { auth } from "@/auth";
import EventCard from "@/components/events/event-card";
import { db } from "@/db";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: number } }) {
  const session = await auth();

  const event = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.id, params.slug),
  });

  return (
    <>
      <EventCard event={event} />
      {/* @ts-ignore */}
      {session && session.user?.role === "administrator" && (
        <Link href={`/events/${params.slug}/edit`}>Edit</Link>
      )}
    </>
  );
}
