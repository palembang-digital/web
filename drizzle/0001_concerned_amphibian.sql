CREATE TABLE IF NOT EXISTS "contact_form" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
