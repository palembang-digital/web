/**
* @source https://orm.drizzle.team/kit-docs/conf
* @source https://orm.drizzle.team/kit-docs/conf#schema-files-paths
*/

import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config({ path: '.env.local' });

const { PG_USER, PG_HOST, PG_DATABASE, PG_PASSWORD } = process.env;

if (!PG_USER || !PG_HOST || !PG_DATABASE || !PG_PASSWORD) {
  throw new Error('DATABASE_URL is not defined');
}

const NEON_DB_URL = `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}/${PG_DATABASE}?sslmode=require`;

export default {
  schema: './src/packages/server/db/schema/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: NEON_DB_URL!
  },
  strict: false
} satisfies Config;
