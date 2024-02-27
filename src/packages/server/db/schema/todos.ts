/** @source https://orm.drizzle.team/docs/column-types/pg */

import {
  serial,
  pgTable,
  text,
  timestamp,
  boolean
} from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  task: text('task').notNull(),
  done: boolean('done').default(false).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
});
