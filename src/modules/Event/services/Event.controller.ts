import EventModel from '@/modules/Event/services/Event.model';
import Controller from '@/packages/server/base/Controller';

class CEvent extends Controller {
  public index = async() => {
    try {
      const payload = await EventModel.findAll();
      return this.sendJSON({
        code: 200,
        message: 'Success get all events.',
        payload
      });
    } catch (err) {
      return this.handleError(err);
    }
  };
}

const EventController = new CEvent();

export default EventController;
