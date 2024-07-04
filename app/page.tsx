import EventsGrid from "@/components/events/events-grid";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <EventsGrid />
      <Footer />
    </>
  );
}
