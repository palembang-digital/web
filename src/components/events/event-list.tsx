import { getEvents } from "@/services/events";
import PastEvents from "../past-events";
import UpcomingEvents from "./upcoming-events";

const EventList = async () => {
  const { pastEvents, upcomingEvents } = await getEvents();

  return (
    <div>
      <UpcomingEvents events={upcomingEvents} />
      <PastEvents events={pastEvents} hideSeeMoreButton />
    </div>
  );
};

export default EventList;
