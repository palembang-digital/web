CREATE TABLE IF NOT EXISTS "events_committees" (
	"event_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"role" text,
	"description" text,
	CONSTRAINT "events_committees_event_id_user_id_pk" PRIMARY KEY("event_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events_committees" ADD CONSTRAINT "events_committees_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events_committees" ADD CONSTRAINT "events_committees_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
