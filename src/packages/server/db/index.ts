import { neon, neonConfig } from '@neondatabase/serverless';
import {  drizzle } from 'drizzle-orm/neon-http';
neonConfig.fetchConnectionCache = true;

const { PG_USER, PG_HOST, PG_DATABASE, PG_PASSWORD } = process.env;

if (!PG_USER || !PG_HOST || !PG_DATABASE || !PG_PASSWORD) {
  throw new Error('DATABASE_URL is not defined');
}

const NEON_DB_URL = `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}/${PG_DATABASE}?sslmode=require`;

/** @source https://neon.tech/docs/serverless/serverless-driver#use-the-driver-over-http */
const sql = neon(NEON_DB_URL);

/** @source https://orm.drizzle.team/docs/get-started-postgresql#neon */
export const db = drizzle(sql);
