import Model from '@/packages/server/db/Model';
import { todos } from '@/packages/server/db/schema/todos';

class MTodo extends Model<typeof todos> {
  constructor() {
    super(todos);
  }
}

const TodoModel = new MTodo();

export default TodoModel;
