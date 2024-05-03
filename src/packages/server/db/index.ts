import { NeonQueryFunction, neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { NEON_DB_URL } from '@/configs/env';

/** @source https://neon.tech/docs/serverless/serverless-driver#use-the-driver-over-http */
const sql: NeonQueryFunction<boolean, boolean> = neon(NEON_DB_URL);

/** @source https://orm.drizzle.team/docs/get-started-postgresql#neon */
export const db = drizzle(sql);
