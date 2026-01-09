ALTER TABLE "contest" DROP CONSTRAINT "contest_contestId_unique";--> statement-breakpoint
ALTER TABLE "mcq" DROP CONSTRAINT "mcq_contestIdx_contest_contestId_fk";
--> statement-breakpoint
DROP INDEX "contestIdx";--> statement-breakpoint
ALTER TABLE "contest" ADD COLUMN "contestName" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "contest" ADD COLUMN "description" varchar;--> statement-breakpoint
ALTER TABLE "mcq" ADD COLUMN "title" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "mcq" ADD COLUMN "description" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "mcq" ADD CONSTRAINT "mcq_contestIdx_contest_id_fk" FOREIGN KEY ("contestIdx") REFERENCES "public"."contest"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "contestNameIdx" ON "contest" USING btree ("contestName","userId");--> statement-breakpoint
CREATE INDEX "contestIdx" ON "contest" USING btree ("contestName","is_active");--> statement-breakpoint
ALTER TABLE "contest" DROP COLUMN "contestId";--> statement-breakpoint
ALTER TABLE "contest" ADD CONSTRAINT "contest_contestName_unique" UNIQUE("contestName");