CREATE TABLE IF NOT EXISTS "feeds_likes" (
	"feed_id" integer NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "feeds_likes_feed_id_user_id_pk" PRIMARY KEY("feed_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feeds_likes" ADD CONSTRAINT "feeds_likes_feed_id_feeds_id_fk" FOREIGN KEY ("feed_id") REFERENCES "public"."feeds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feeds_likes" ADD CONSTRAINT "feeds_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
