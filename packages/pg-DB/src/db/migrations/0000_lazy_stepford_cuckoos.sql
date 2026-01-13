CREATE TYPE "public"."option" AS ENUM('option1', 'option2', 'option3', 'option4');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'user', 'organizer');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('activate', 'completed', 'started', 'pending', 'deactivate');--> statement-breakpoint
CREATE TABLE "contest" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "contest_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"contestName" varchar(50) NOT NULL,
	"description" varchar,
	"startTime" timestamp with time zone NOT NULL,
	"endTime" timestamp with time zone NOT NULL,
	"is_active" boolean NOT NULL,
	"status" "status" NOT NULL,
	CONSTRAINT "contest_contestName_unique" UNIQUE("contestName")
);
--> statement-breakpoint
CREATE TABLE "mcq" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "mcq_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"contestId" integer NOT NULL,
	"userId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar NOT NULL,
	"option1" varchar NOT NULL,
	"option2" varchar NOT NULL,
	"option3" varchar NOT NULL,
	"option4" varchar NOT NULL,
	"rightAns" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_ans" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_ans_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"contest_id" integer,
	"user_id" integer NOT NULL,
	"mcqId" integer NOT NULL,
	"ans" "option" NOT NULL,
	"selectedAnswer" varchar NOT NULL,
	"is_correct" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"password" varchar NOT NULL,
	"email" varchar(255) NOT NULL,
	"is_active" boolean NOT NULL,
	"role" "role" NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "contest" ADD CONSTRAINT "contest_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mcq" ADD CONSTRAINT "mcq_contestId_contest_id_fk" FOREIGN KEY ("contestId") REFERENCES "public"."contest"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mcq" ADD CONSTRAINT "mcq_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_ans" ADD CONSTRAINT "user_ans_contest_id_contest_id_fk" FOREIGN KEY ("contest_id") REFERENCES "public"."contest"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_ans" ADD CONSTRAINT "user_ans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_ans" ADD CONSTRAINT "user_ans_mcqId_mcq_id_fk" FOREIGN KEY ("mcqId") REFERENCES "public"."mcq"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "userIdx" ON "contest" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "contestIdx" ON "contest" USING btree ("contestName","is_active");--> statement-breakpoint
CREATE INDEX "contestNameIdx" ON "contest" USING btree ("contestName","userId");--> statement-breakpoint
CREATE INDEX "mcq_contest_id_idx" ON "mcq" USING btree ("contestId");--> statement-breakpoint
CREATE INDEX "mcq_user_id_idx" ON "mcq" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "mcq_unique_title_per_contest" ON "mcq" USING btree ("contestId","title");--> statement-breakpoint
CREATE INDEX "user_answers_mcq_id_idx" ON "user_ans" USING btree ("mcqId");--> statement-breakpoint
CREATE INDEX "user_answers_user_id_idx" ON "user_ans" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "contestIdIdx" ON "user_ans" USING btree ("contest_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_answers_unique_mcq_user" ON "user_ans" USING btree ("mcqId","user_id");--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");