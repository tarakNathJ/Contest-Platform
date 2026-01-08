CREATE TYPE "public"."role" AS ENUM('admin', 'user', 'organizer');--> statement-breakpoint
CREATE TABLE "contest" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "contest_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer,
	"contestId" varchar(50) NOT NULL,
	"startTime" boolean NOT NULL,
	"is_active" boolean NOT NULL,
	CONSTRAINT "contest_contestId_unique" UNIQUE("contestId")
);
--> statement-breakpoint
CREATE TABLE "mcq" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "mcq_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"contestIdx" integer,
	"userId" integer,
	"option1" varchar NOT NULL,
	"option2" varchar NOT NULL,
	"option3" varchar NOT NULL,
	"option4" varchar NOT NULL,
	"ans" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_ans" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_ans_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"mcqTableId" integer NOT NULL,
	"ans" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"is_active" boolean NOT NULL,
	"role" "role" NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "contest" ADD CONSTRAINT "contest_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mcq" ADD CONSTRAINT "mcq_contestIdx_contest_contestId_fk" FOREIGN KEY ("contestIdx") REFERENCES "public"."contest"("contestId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mcq" ADD CONSTRAINT "mcq_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "userIdx" ON "contest" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "contestIdx" ON "contest" USING btree ("contestId","is_active");--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");