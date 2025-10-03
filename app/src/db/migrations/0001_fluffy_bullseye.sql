ALTER TABLE "bookmarks" ALTER COLUMN "course_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "duration" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "creator_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "progress" ALTER COLUMN "course_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "youtube_url";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "thumbnail_url";