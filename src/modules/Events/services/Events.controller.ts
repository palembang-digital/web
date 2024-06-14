import EventsModel from '@/modules/Events/services/Events.model';
import Controller from '@/packages/server/base/Controller';

class CEvents extends Controller {
  public index = async() => {
    try {
      const payload = await EventsModel.findAll();
      return this.sendJSON({
        code: 200,
        message: 'Success get all events.',
        payload
      });
    } catch (err) {
      return this.handleError(err);
    }
  };

  public get = async(id: number) => {
    try {
      const payload = await EventsModel.findOne(id);
      return this.sendJSON({
        code: 200,
        message: 'Success get the event.',
        payload
      });
    } catch (err) {
      return this.handleError(err);
    }
  };
}

const EventsController = new CEvents();

export default EventsController;
