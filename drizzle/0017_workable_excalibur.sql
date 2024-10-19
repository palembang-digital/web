DO $$ BEGIN
 CREATE TYPE "public"."event_status" AS ENUM('draft', 'review', 'published', 'private', 'cancelled', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "status" "event_status" DEFAULT 'draft' NOT NULL;