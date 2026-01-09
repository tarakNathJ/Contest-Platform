ALTER TABLE "mcq" ALTER COLUMN "contestIdx" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_ans" ADD COLUMN "right_or_wrong" boolean NOT NULL;