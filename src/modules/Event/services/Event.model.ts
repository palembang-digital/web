import Model from '@/packages/server/db/Model';
import { events } from '@/packages/server/db/schema/events';

class MEvent extends Model<typeof events> {
  constructor() {
    super(events);
  }
}

const EventModel = new MEvent();

export default EventModel;
