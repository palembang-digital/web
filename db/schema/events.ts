import { users } from "@/db/schema/auth";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("image_url"),
  scheduledStart: timestamp("scheduled_start").notNull(),
  registrationUrl: text("registration_url"),
  scheduledEnd: timestamp("scheduled_end").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  youtubeId: text("youtube_id"),
  registrationFee: integer("registration_fee"),
  description: text("description"),
});

export const eventsSpeakers = pgTable("events_speakers", {
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
