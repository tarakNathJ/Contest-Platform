CREATE TYPE "public"."status" AS ENUM('activate', 'deactivate');--> statement-breakpoint
ALTER TABLE "contest" ADD COLUMN "status" "status" NOT NULL;