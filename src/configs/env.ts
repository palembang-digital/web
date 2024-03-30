/** @see https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables */

/** Process ENV */
export const NODE_ENV = process.env.NODE_ENV || 'production';
export const SECRET_APP_KEY = process.env.SECRET_APP_KEY;

export const PG_USER = process.env.PG_USER;
export const PG_HOST = process.env.PG_HOST;
export const PG_DATABASE = process.env.PG_DATABASE;
export const PG_PASSWORD = process.env.PG_PASSWORD;

/** Google OAuth */
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

/** NEXT_PUBLIC ENV */

/** Custom ENV */
export const IS_DEV = NODE_ENV !== 'production';
export const SITE_NAME = 'Palembang Digital';
export const NEON_DB_URL = `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}/${PG_DATABASE}?sslmode=require`;
