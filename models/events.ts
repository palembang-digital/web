import { events } from "@/db/schema/events";
import Model from "@/models/base";

class MEvents extends Model<typeof events> {
  constructor() {
    super(events);
  }
}

const EventsModel = new MEvents();

export default EventsModel;
