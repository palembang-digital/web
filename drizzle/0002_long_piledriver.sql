ALTER TABLE "events_speakers" ADD CONSTRAINT "events_speakers_event_id_user_id_pk" PRIMARY KEY("event_id","user_id");--> statement-breakpoint
ALTER TABLE "events_videos" ADD CONSTRAINT "events_videos_event_id_video_id_pk" PRIMARY KEY("event_id","video_id");--> statement-breakpoint
ALTER TABLE "videos_speakers" ADD CONSTRAINT "videos_speakers_video_id_user_id_pk" PRIMARY KEY("video_id","user_id");