DO $$ BEGIN
 CREATE TYPE "public"."job_type" AS ENUM('full-time', 'part-time', 'contract', 'temporary', 'other', 'volunteer', 'internship');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."workplace_type" AS ENUM('on-site', 'hybrid', 'remote');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "workplace_type" "workplace_type" DEFAULT 'on-site' NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "job_type" "job_type" DEFAULT 'full-time' NOT NULL;