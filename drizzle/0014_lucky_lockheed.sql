ALTER TABLE "feeds_comments" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "feeds_comments" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;