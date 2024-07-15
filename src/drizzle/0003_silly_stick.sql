DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('administrator', 'member');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_role" "user_role" DEFAULT 'member' NOT NULL;