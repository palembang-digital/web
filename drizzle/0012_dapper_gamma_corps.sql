DO $$ BEGIN
 CREATE TYPE "public"."rsvp_type" AS ENUM('yes', 'maybe', 'no');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events_attendees" (
	"event_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"rsvp" "rsvp_type" DEFAULT 'yes' NOT NULL,
	"attended" boolean DEFAULT false NOT NULL,
	CONSTRAINT "events_attendees_event_id_user_id_pk" PRIMARY KEY("event_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events_attendees" ADD CONSTRAINT "events_attendees_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events_attendees" ADD CONSTRAINT "events_attendees_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
