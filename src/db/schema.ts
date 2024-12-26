import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
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
  onboarded: boolean("onboarded").notNull().default(false),
  username: text("username")
    .notNull()
    .$defaultFn((): string => generateUsername())
    .unique(),
  phoneNumber: text("phone_number"),
  occupation: text("occupation"),
  institution: text("institution"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const onboardingSchema = createInsertSchema(users, {
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_.-]+$/, {
      message:
        "Username can only contain alphanumeric characters, underscores (_), dashes (-), and periods (.)",
    }),
}).pick({
  name: true,
  username: true,
  phoneNumber: true,
  occupation: true,
  institution: true,
  bio: true,
});

export const insertUserSchema = createInsertSchema(users, {
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_.-]+$/, {
      message:
        "Username can only contain alphanumeric characters, underscores (_), dashes (-), and periods (.)",
    }),
}).pick({
  name: true,
  username: true,
  phoneNumber: true,
  occupation: true,
  institution: true,
  bio: true,
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

export const eventLocationTypeEnum = pgEnum("event_location_type", [
  "offline",
  "online",
  "hybrid",
]);

export const eventStatusEnum = pgEnum("event_status", [
  "draft",
  "review",
  "published",
  "private",
  "cancelled",
  "completed",
]);

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("image_url"),
  scheduledStart: timestamp("scheduled_start").notNull(),
  scheduledEnd: timestamp("scheduled_end").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  registrationUrlType: text("registration_url_type"),
  registrationUrl: text("registration_url"),
  registrationFee: integer("registration_fee"),
  description: text("description"),
  attendeeLimit: integer("attendee_limit"),
  locationName: text("location_name"),
  locationUrl: text("location_url"),
  locationType: eventLocationTypeEnum("location_type"),
  status: eventStatusEnum("status").notNull().default("draft"),
  whatsappGroupUrl: text("whatsapp_group_url"),
  feedbackUrl: text("feedback_url"),
});

export const insertEventSchema = createInsertSchema(events, {
  registrationFee: z.coerce.number(),
  attendeeLimit: z.coerce.number(),
  locationType: z.string().optional(),
}).pick({
  imageUrl: true,
  name: true,
  scheduledStart: true,
  scheduledEnd: true,
  registrationUrlType: true,
  registrationUrl: true,
  registrationFee: true,
  attendeeLimit: true,
  description: true,
  locationType: true,
  locationName: true,
  status: true,
  whatsappGroupUrl: true,
});

export const rsvpTypeEnum = pgEnum("rsvp_type", ["yes", "maybe", "no"]);

export const eventsAttendees = pgTable(
  "events_attendees",
  {
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    rsvp: rsvpTypeEnum("rsvp").notNull().default("yes"),
    attended: boolean("attended").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.eventId, t.userId] }),
  })
);

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

export const eventsCommittees = pgTable(
  "events_committees",
  {
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: text("role"),
    description: text("description"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.eventId, t.userId] }),
  })
);

export const eventsHostsUsers = pgTable(
  "events_hosts_users",
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

export const eventsHostsOrganizations = pgTable(
  "events_hosts_organizations",
  {
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    organizationId: integer("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.eventId, t.organizationId] }),
  })
);

export const eventsSponsorsUsers = pgTable(
  "events_sponsors_users",
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

export const eventsSponsorsOrganizations = pgTable(
  "events_sponsors_organizations",
  {
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    organizationId: integer("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.eventId, t.organizationId] }),
  })
);

export const eventsDiscussions = pgTable("events_discussions", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  parentId: integer("parent_id"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const eventsPhotos = pgTable(
  "events_photos",
  {
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    photoId: integer("photo_id")
      .notNull()
      .references(() => photos.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.eventId, t.photoId] }),
  })
);

export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

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

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
  slug: text("slug").notNull().unique(),
  organizationType: text("organization_type"),
  email: text("email"),
  phoneNumber: text("phone_number"),
  website: text("website"),
  shortBio: text("short_bio"),
  longBio: text("long_bio"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const selectOrganizationSchema = createSelectSchema(organizations);

export const insertOrganizationSchema = createInsertSchema(organizations).pick({
  name: true,
  image: true,
  slug: true,
  organizationType: true,
  email: true,
  phoneNumber: true,
  website: true,
  shortBio: true,
  longBio: true,
});

export const contactForm = pgTable("contact_form", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContactFormSchema = createInsertSchema(contactForm, {
  email: (schema) => schema.email.email(),
}).pick({
  email: true,
  message: true,
});

export const certificateStatusEnum = pgEnum("certificate_status", [
  "pending",
  "approved",
  "rejected",
]);

export const certificates = pgTable(
  "certificates",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: text("role").notNull().default("Peserta"),
    template: text("template"),
    status: certificateStatusEnum("status").notNull().default("pending"),
    signatures: jsonb("signatures").$type<any[]>(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => ({
    unq: unique().on(t.eventId, t.userId, t.role),
  })
);

export const feeds = pgTable("feeds", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertFeedSchema = createInsertSchema(feeds, {
  content: z.string().min(1).max(300),
}).pick({
  content: true,
});

export const feedsLikes = pgTable(
  "feeds_likes",
  {
    feedId: integer("feed_id")
      .notNull()
      .references(() => feeds.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.feedId, t.userId] }),
  })
);

export const feedsComments = pgTable("feeds_comments", {
  id: serial("id").primaryKey(),
  feedId: integer("feed_id")
    .notNull()
    .references(() => feeds.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertFeedCommentSchema = createInsertSchema(feedsComments, {
  comment: z.string().max(300),
}).pick({
  comment: true,
});

export const workplaceTypeEnum = pgEnum("workplace_type", [
  "on-site",
  "hybrid",
  "remote",
]);

export const jobTypeEnum = pgEnum("job_type", [
  "full-time",
  "part-time",
  "contract",
  "temporary",
  "other",
  "volunteer",
  "internship",
]);

export const jobStatusEnum = pgEnum("job_opening_status", [
  "draft",
  "published",
  "closed",
]);

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  workplaceType: workplaceTypeEnum("workplace_type")
    .notNull()
    .default("on-site"),
  jobType: jobTypeEnum("job_type").notNull().default("full-time"),
  salary: text("salary"),
  applicationUrl: text("application_url").notNull(),
  status: jobStatusEnum("status").notNull().default("draft"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdBy: text("created_by").notNull(),
  updatedBy: text("updated_by").notNull(),
});

export const insertJobSchema = createInsertSchema(jobs).pick({
  title: true,
  company: true,
  location: true,
  workplaceType: true,
  jobType: true,
  description: true,
  salary: true,
  applicationUrl: true,
});

export const articleStatusEnum = pgEnum("article_status", [
  "draft",
  "published",
  "reviewed",
  "deleted",
]);

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  coverImage: text("cover_image"),
  category: text("category"),
  content: text("content").notNull(),
  status: articleStatusEnum("status").notNull().default("draft"),
  keywords: text("keywords"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdBy: text("created_by").notNull(),
  updatedBy: text("updated_by").notNull(),
});

export const insertArticleSchema = createInsertSchema(articles).pick({
  title: true,
  slug: true,
  coverImage: true,
  category: true,
  content: true,
});

export const articlesAuthors = pgTable(
  "articles_authors",
  {
    articleId: integer("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.articleId, t.userId] }),
  })
);

// ==================================================
//
// RELATIONS
//
// ==================================================

export const usersRelations = relations(users, ({ many }) => ({
  eventsSpeakers: many(eventsSpeakers),
  eventsAttendees: many(eventsAttendees),
  eventsCommittees: many(eventsCommittees),
  eventsHostsUsers: many(eventsHostsUsers),
  eventsSponsorsUsers: many(eventsSponsorsUsers),
  eventsDiscussions: many(eventsDiscussions),
  videosSpeakers: many(videosSpeakers),
  certificates: many(certificates),
  feeds: many(feeds),
  feedsLikes: many(feedsLikes),
  feedsComments: many(feedsComments),
  articles: many(articlesAuthors),
}));

export const organizationsRelations = relations(organizations, ({ many }) => ({
  eventsHostsOrganizations: many(eventsHostsOrganizations),
  eventsSponsorsOrganizations: many(eventsSponsorsOrganizations),
}));

export const eventsRelations = relations(events, ({ many }) => ({
  eventsSpeakers: many(eventsSpeakers),
  eventsAttendees: many(eventsAttendees),
  eventsCommittees: many(eventsCommittees),
  eventsPhotos: many(eventsPhotos),
  eventsVideos: many(eventsVideos),
  eventsHostsUsers: many(eventsHostsUsers),
  eventsHostsOrganizations: many(eventsHostsOrganizations),
  eventsSponsorsUsers: many(eventsSponsorsUsers),
  eventsSponsorsOrganizations: many(eventsSponsorsOrganizations),
  eventsDiscussions: many(eventsDiscussions),
  certificates: many(certificates),
}));

export const photosRelations = relations(photos, ({ many }) => ({
  eventsPhotos: many(eventsPhotos),
}));

export const videosRelations = relations(videos, ({ many }) => ({
  eventsVideos: many(eventsVideos),
  videosSpeakers: many(videosSpeakers),
}));

export const articlesRelations = relations(articles, ({ many }) => ({
  authors: many(articlesAuthors),
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

export const eventsAttendeesRelations = relations(
  eventsAttendees,
  ({ one }) => ({
    event: one(events, {
      fields: [eventsAttendees.eventId],
      references: [events.id],
    }),
    user: one(users, {
      fields: [eventsAttendees.userId],
      references: [users.id],
    }),
  })
);

export const eventsCommitteesRelations = relations(
  eventsCommittees,
  ({ one }) => ({
    event: one(events, {
      fields: [eventsCommittees.eventId],
      references: [events.id],
    }),
    user: one(users, {
      fields: [eventsCommittees.userId],
      references: [users.id],
    }),
  })
);

export const eventsHostsUsersRelations = relations(
  eventsHostsUsers,
  ({ one }) => ({
    event: one(events, {
      fields: [eventsHostsUsers.eventId],
      references: [events.id],
    }),
    user: one(users, {
      fields: [eventsHostsUsers.userId],
      references: [users.id],
    }),
  })
);

export const eventsHostsOrganizationsRelations = relations(
  eventsHostsOrganizations,
  ({ one }) => ({
    event: one(events, {
      fields: [eventsHostsOrganizations.eventId],
      references: [events.id],
    }),
    organization: one(organizations, {
      fields: [eventsHostsOrganizations.organizationId],
      references: [organizations.id],
    }),
  })
);

export const eventsSponsorsUsersRelations = relations(
  eventsSponsorsUsers,
  ({ one }) => ({
    event: one(events, {
      fields: [eventsSponsorsUsers.eventId],
      references: [events.id],
    }),
    user: one(users, {
      fields: [eventsSponsorsUsers.userId],
      references: [users.id],
    }),
  })
);

export const eventsSponsorsOrganizationsRelations = relations(
  eventsSponsorsOrganizations,
  ({ one }) => ({
    event: one(events, {
      fields: [eventsSponsorsOrganizations.eventId],
      references: [events.id],
    }),
    organization: one(organizations, {
      fields: [eventsSponsorsOrganizations.organizationId],
      references: [organizations.id],
    }),
  })
);

export const eventsDiscussionsRelations = relations(
  eventsDiscussions,
  ({ one }) => ({
    event: one(events, {
      fields: [eventsDiscussions.eventId],
      references: [events.id],
    }),
    user: one(users, {
      fields: [eventsDiscussions.userId],
      references: [users.id],
    }),
  })
);

export const eventsPhotosRelations = relations(eventsPhotos, ({ one }) => ({
  event: one(events, {
    fields: [eventsPhotos.eventId],
    references: [events.id],
  }),
  photo: one(photos, {
    fields: [eventsPhotos.photoId],
    references: [photos.id],
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

export const certificatesRelations = relations(certificates, ({ one }) => ({
  event: one(events, {
    fields: [certificates.eventId],
    references: [events.id],
  }),
  user: one(users, {
    fields: [certificates.userId],
    references: [users.id],
  }),
}));

export const feedsUsersRelations = relations(feeds, ({ one, many }) => ({
  user: one(users, {
    fields: [feeds.userId],
    references: [users.id],
  }),
  likes: many(feedsLikes),
  comments: many(feedsComments),
}));

export const feedsLikesRelations = relations(feedsLikes, ({ one }) => ({
  user: one(users, {
    fields: [feedsLikes.userId],
    references: [users.id],
  }),
  feed: one(feeds, {
    fields: [feedsLikes.feedId],
    references: [feeds.id],
  }),
}));

export const feedsCommentsRelations = relations(feedsComments, ({ one }) => ({
  user: one(users, {
    fields: [feedsComments.userId],
    references: [users.id],
  }),
  feed: one(feeds, {
    fields: [feedsComments.feedId],
    references: [feeds.id],
  }),
}));

export const authorsUsersRelations = relations(articlesAuthors, ({ one }) => ({
  article: one(articles, {
    fields: [articlesAuthors.articleId],
    references: [articles.id],
  }),
  user: one(users, {
    fields: [articlesAuthors.userId],
    references: [users.id],
  }),
}));
