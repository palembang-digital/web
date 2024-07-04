import EventsGrid from "@/components/events/events-grid";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import EventsModel from "@/models/events";

export default async function Page() {
  const events = await EventsModel.findAll();

  return (
    <>
      <Header />
      <Hero />
      <EventsGrid events={events} end={5} />
      <Footer />
    </>
  );
}
