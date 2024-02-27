import TodoModel from '@/modules/Todo/services/Todo.model';
import Controller from '@/packages/server/base/Controller';

class CTodo extends Controller {
  /**
   * Use arrow function to create Controller method.
   * @see https://www.geeksforgeeks.org/arrow-functions-in-javascript/
   * @param req Request
   */
  public index = async() => {
    try {
      const payload = await TodoModel.findAll();
      return this.sendJSON({
        code: 200,
        message: 'Success get all jokes.',
        payload
      });
    } catch (err) {
      return this.handleError(err);
    }
  };

  public insert = async(req: Request) => {
    try {
      const body = await req.json();
      const { done = false, task } = body;

      const errors: string[] = [];
      if (!task) errors.push('field "task" is required.');
      if (errors.length) return this.setError(400, errors, 'Validation error.');

      await TodoModel.create({ task, done });

      return this.sendJSON({
        code: 201,
        message: 'Success add new Todo.',
        payload: { task, done }
      });
    } catch (err) {
      return this.handleError(err);
    }
  };
}

const TodoController = new CTodo();

export default TodoController;
