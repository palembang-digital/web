import TodoModel from '@/modules/Todo/services/Todo.model';

async function TodoList() {
  const todos = await TodoModel.findAll();
  const todo = await TodoModel.findOne(1);

  return (
    <div className="bg-gray-800 p-2 rounded w-full max-w-[500px]">
      <p className="text-sm text-slate-400 px-5 text-center mb-5">
        Todo list returned directly from the Database.
      </p>
      <code className="max-w-[380px] mb-16 text-center text-slate-300">
        {JSON.stringify(todos, null, 2)}
      </code>
      <br />
      <code className="max-w-[380px] mb-16 text-center text-slate-300">
        {JSON.stringify(todo ?? {}, null, 2)}
      </code>
    </div>
  );
}

export default TodoList;
