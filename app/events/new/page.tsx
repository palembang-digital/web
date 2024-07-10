import { auth } from "@/auth";
import NewEventForm from "@/components/events/new-event-form";

export default async function Page() {
  const session = await auth();

  // @ts-ignore
  if (!session || session.user?.role !== "administrator") {
    return <p>Not authenticated</p>;
  }

  return <NewEventForm />;
}
