import { auth } from "@/auth";
import { TypographyH1 } from "@/components/ui/typography";
import { db } from "@/db";

export default async function Page() {
  const session = await auth();

  // @ts-ignore
  if (!session || session.user?.role !== "administrator") {
    return <p>Not authenticated. Please log in first.</p>;
  }

  const events = await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.scheduledStart)],
  });

  const eventOptions = events.map((event) => ({
    value: event.id.toString(),
    label: event.name,
  }));

  return (
    <>
      <TypographyH1>Add new video</TypographyH1>
    </>
  );
}
