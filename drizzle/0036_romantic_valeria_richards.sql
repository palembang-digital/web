CREATE TABLE IF NOT EXISTS "events_photos" (
	"event_id" integer NOT NULL,
	"photo_id" integer NOT NULL,
	CONSTRAINT "events_photos_event_id_photo_id_pk" PRIMARY KEY("event_id","photo_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events_photos" ADD CONSTRAINT "events_photos_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events_photos" ADD CONSTRAINT "events_photos_photo_id_photos_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."photos"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
