ALTER TABLE "events" RENAME TO "event";--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "scheduled_start" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "scheduled_end" timestamp NOT NULL;