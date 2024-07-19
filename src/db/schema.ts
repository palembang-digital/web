import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type { AdapterAccountType } from "next-auth/adapters";
import { generateUsername } from "unique-username-generator";
import { z } from "zod";

export const userRoleEnum = pgEnum("user_role", ["administrator", "member"]);

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: userRoleEnum("user_role").notNull().default("member"),
  username: text("username")
    .notNull()
    .$defaultFn((): string => generateUsername())
    .unique(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationTokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticators",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("image_url"),
  registrationUrl: text("registration_url"),
  scheduledStart: timestamp("scheduled_start").notNull(),
  scheduledEnd: timestamp("scheduled_end").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  registrationFee: integer("registration_fee"),
  description: text("description"),
});

export const insertEventSchema = createInsertSchema(events, {
  registrationFee: z.coerce.number(),
}).pick({
  name: true,
  imageUrl: true,
  registrationUrl: true,
  scheduledStart: true,
  scheduledEnd: true,
  registrationFee: true,
  description: true,
});

export const eventsSpeakers = pgTable(
  "events_speakers",
  {
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.eventId, t.userId] }),
  })
);

export const eventsVideos = pgTable(
  "events_videos",
  {
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    videoId: integer("video_id")
      .notNull()
      .references(() => videos.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.eventId, t.videoId] }),
  })
);

export const videoTypeEnum = pgEnum("video_type", ["upload", "youtube"]);

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  videoUrl: text("video_url").unique(),
  thumbnails: json("thumbnails"),
  videoType: videoTypeEnum("video_type").notNull().default("upload"),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const videosSpeakers = pgTable(
  "videos_speakers",
  {
    videoId: integer("video_id")
      .notNull()
      .references(() => videos.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.videoId, t.userId] }),
  })
);

// ==================================================
//
// RELATIONS
//
// ==================================================

export const usersRelations = relations(users, ({ many }) => ({
  eventsSpeakers: many(eventsSpeakers),
}));

export const eventsRelations = relations(events, ({ many }) => ({
  eventsSpeakers: many(eventsSpeakers),
  eventsVideos: many(eventsVideos),
}));

export const videosRelations = relations(videos, ({ many }) => ({
  eventsVideos: many(eventsVideos),
  videosSpeakers: many(videosSpeakers),
}));

export const eventsSpeakersRelations = relations(eventsSpeakers, ({ one }) => ({
  event: one(events, {
    fields: [eventsSpeakers.eventId],
    references: [events.id],
  }),
  user: one(users, {
    fields: [eventsSpeakers.userId],
    references: [users.id],
  }),
}));

export const eventsVideosRelations = relations(eventsVideos, ({ one }) => ({
  event: one(events, {
    fields: [eventsVideos.eventId],
    references: [events.id],
  }),
  video: one(videos, {
    fields: [eventsVideos.videoId],
    references: [videos.id],
  }),
}));

export const videosSpeakersRelations = relations(videosSpeakers, ({ one }) => ({
  video: one(videos, {
    fields: [videosSpeakers.videoId],
    references: [videos.id],
  }),
  user: one(users, {
    fields: [videosSpeakers.userId],
    references: [users.id],
  }),
}));
