DO $$ BEGIN
 CREATE TYPE "public"."video_type" AS ENUM('upload', 'youtube');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "videos" ADD COLUMN "thumbnails" json;--> statement-breakpoint
ALTER TABLE "videos" ADD COLUMN "video_type" "video_type" DEFAULT 'upload' NOT NULL;--> statement-breakpoint
ALTER TABLE "videos" ADD COLUMN "published_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "videos" DROP COLUMN IF EXISTS "thumbnail_url";--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_video_url_unique" UNIQUE("video_url");