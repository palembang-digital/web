import { auth } from "@/auth";
import { MultiSelect } from "@/components/ui/multi-select";
import { TypographyH1 } from "@/components/ui/typography";
import { db } from "@/db";

export default async function Page() {
  const session = await auth();

  // @ts-ignore
  if (!session || session.user?.role !== "administrator") {
    return <p>Not authenticated</p>;
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
      <MultiSelect options={eventOptions} placeholder="Select events..." />
    </>
  );
}
