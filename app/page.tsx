import { auth } from "@/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import EventsGrid from "@/components/events/events-grid";
import Hero from "@/components/landing/hero";
import { db } from "@/db";

// TODO
async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return <p>Not authenticated</p>;
  }

  return (
    <div className="grid lg:grid-cols-5">
      {/* <p>Hi, {session.user?.name}</p>
      <SignOut /> */}
      <Sidebar />
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8"></div>
      </div>
    </div>
  );
}

async function LandingPage() {
  const events = await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.scheduledStart)],
  });

  return (
    <>
      <Hero />
      <EventsGrid events={events} end={5} />
    </>
  );
}

export default async function Page() {
  // TODO
  // const session = await auth();
  // return session ? <DashboardPage /> : <LandingPage />;

  return <LandingPage />;
}
