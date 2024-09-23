import { getEvents } from "@/services/events";
import PastEvents from "../past-events";
import UpcomingEvents from "./upcoming-events";

const EventList = async () => {
  const events = await getEvents();
  const upcomingEvents = events.filter(
    (event) => new Date(event.scheduledStart) >= new Date()
  );
  const pastEvents = events.filter(
    (event) => new Date(event.scheduledStart) < new Date()
  );

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
