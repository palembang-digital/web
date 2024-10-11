ALTER TABLE "feeds_comments" DROP CONSTRAINT "feeds_comments_feed_id_user_id_pk";--> statement-breakpoint
ALTER TABLE "feeds_comments" ADD COLUMN "id" serial NOT NULL;