DO $$ BEGIN
 CREATE TYPE "public"."job_opening_status" AS ENUM('draft', 'published', 'closed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "status" "job_opening_status" DEFAULT 'draft' NOT NULL;