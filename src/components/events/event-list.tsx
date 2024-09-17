import { getEvents } from "@/services/events";
import PastEvents from "../past-events";
import UpcomingEvents from "./upcoming-events";

const EventList = async () => {
  const { pastEvents, upcomingEvents } = await getEvents();

  return (
    <div>
      {upcomingEvents && upcomingEvents.length > 0 && (
        <div className="mb-16">
          <UpcomingEvents events={upcomingEvents} />
        </div>
      )}
      <PastEvents events={pastEvents} hideSeeMoreButton />
    </div>
  );
};

export default EventList;
