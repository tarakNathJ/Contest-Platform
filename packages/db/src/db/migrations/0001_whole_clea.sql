CREATE TABLE "contest_result" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "contest_result_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"contest_id" integer,
	"result" jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contest_result" ADD CONSTRAINT "contest_result_contest_id_contest_id_fk" FOREIGN KEY ("contest_id") REFERENCES "public"."contest"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "contest_idx" ON "contest_result" USING btree ("contest_id");