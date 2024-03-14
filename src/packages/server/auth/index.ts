import { DrizzleAdapter } from '@auth/drizzle-adapter';
import  { type AuthOptions, getServerSession } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '@/configs/env';
import { db } from '@/packages/server/db';

/**
   * type of next-auth and drizzle adapter does not match each other
   * so we have to manually cast it */
const adapter: Adapter = DrizzleAdapter(db) as Adapter;

export const authOptions: AuthOptions = {
  adapter,
  session: {
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: 'database',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    updateAge: 24 * 60 * 60 // 24 hours
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },

    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id
        }
      };
    }
  }
};

/**
 * Wrapper for `getServerSession` @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
