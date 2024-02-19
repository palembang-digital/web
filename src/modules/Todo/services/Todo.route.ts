/**
 * @route `/api/todos`
 * @dir `app/api/todos/route.ts`
 */

import TodoController from '@/modules/Todo/services/Todo.controller';

export const GET = TodoController.index;
