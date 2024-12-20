CREATE TABLE IF NOT EXISTS "events_sponsors_organizations" (
	"event_id" integer NOT NULL,
	"organization_id" integer NOT NULL,
	CONSTRAINT "events_sponsors_organizations_event_id_organization_id_pk" PRIMARY KEY("event_id","organization_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events_sponsors_users" (
	"event_id" integer NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "events_sponsors_users_event_id_user_id_pk" PRIMARY KEY("event_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events_sponsors_organizations" ADD CONSTRAINT "events_sponsors_organizations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events_sponsors_organizations" ADD CONSTRAINT "events_sponsors_organizations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events_sponsors_users" ADD CONSTRAINT "events_sponsors_users_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events_sponsors_users" ADD CONSTRAINT "events_sponsors_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
