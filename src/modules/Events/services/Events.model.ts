import Model from '@/packages/server/db/Model';
import { events } from '@/packages/server/db/schema/events';

class MEvents extends Model<typeof events> {
  constructor() {
    super(events);
  }
}

const EventsModel = new MEvents();

export default EventsModel;
