DO $$ BEGIN
 CREATE TYPE "public"."event_location_type" AS ENUM('offline', 'online', 'hybrid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "location_url" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "location_type" "event_location_type";