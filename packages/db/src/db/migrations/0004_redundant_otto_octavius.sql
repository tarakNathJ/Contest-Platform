ALTER TABLE "contest" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "mcq" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_ans" ADD COLUMN "optionId" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "user_ans" ADD CONSTRAINT "user_ans_mcqTableId_mcq_id_fk" FOREIGN KEY ("mcqTableId") REFERENCES "public"."mcq"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "title_contest_unique" ON "mcq" USING btree ("contestIdx","title");