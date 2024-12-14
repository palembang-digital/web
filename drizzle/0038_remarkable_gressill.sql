DO $$ BEGIN
 CREATE TYPE "public"."certificate_status" AS ENUM('pending', 'approved', 'rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "certificates" ADD COLUMN "status" "certificate_status" DEFAULT 'pending' NOT NULL;