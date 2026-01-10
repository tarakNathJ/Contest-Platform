import {
  boolean,
  integer,
  pgTable,
  varchar,
  pgEnum,
  uniqueIndex,
  timestamp,
} from "drizzle-orm/pg-core";
import { index } from "drizzle-orm/pg-core";
export const roleEnum = pgEnum("role", ["admin", "user", "organizer"]);
export const statusEnum = pgEnum("status", [
  "activate",
  "completed",
  "started",
  "pending",
  "deactivate",
]);

export const answerEnum = pgEnum("answer", [
  "option1",
  "option2",
  "option3",
  "option4",
]);
export const usersTable = pgTable(
  "users",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    password: varchar("password").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    is_active: boolean("is_active").notNull(),
    role: roleEnum("role").notNull(),
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
  })
);

export const contestTable = pgTable(
  "contest",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("userId")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    contestName: varchar("contestName", { length: 50 }).notNull().unique(),
    description: varchar("description"),
    startTime: timestamp("startTime", { withTimezone: true }).notNull(),
    endTime: timestamp("endTime", { withTimezone: true }).notNull(),
    is_active: boolean("is_active").notNull(),
    status: statusEnum("status").notNull(),
  },
  (table) => ({
    userId: index("userIdx").on(table.userId),
    contestIsActive: index("contestIdx").on(table.contestName, table.is_active),
    contestNameIdx: index("contestNameIdx").on(table.contestName, table.userId),
  })
);

export const mcqTable = pgTable(
  "mcq",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    contestId: integer("contestId")
      .notNull()
      .references(() => contestTable.id, { onDelete: "cascade" }),

    userId: integer("userId")
      .notNull()
      .references(() => usersTable.id),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description").notNull(),
    option1: varchar("option1").notNull(),
    option2: varchar("option2").notNull(),
    option3: varchar("option3").notNull(),
    option4: varchar("option4").notNull(),
    ans: varchar("ans").notNull(),
  },
  (table) => ({
    contestIdIdx: index("mcq_contest_id_idx").on(table.contestId), // This is correct
    userIdIdx: index("mcq_user_id_idx").on(table.userId),

    uniqueTitlePerContest: uniqueIndex("mcq_unique_title_per_contest").on(
      table.contestId,
      table.title
    ),
  })
);
export const userAnswerTable = pgTable(
  "user_ans",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    mcqId: integer("mcqId")
      .notNull()
      .references(() => mcqTable.id, { onDelete: "cascade" }),
    ans: varchar("ans").notNull(),
    selectedAnswer: answerEnum("selected_answer").notNull(),
    isCorrect: boolean("is_correct").notNull(),
  },
  (table) => ({
    mcqIdIdx: index("user_answers_mcq_id_idx").on(table.mcqId),
    userIdIdx: index("user_answers_user_id_idx").on(table.userId),

    oneAttemptPerUser: uniqueIndex("user_answers_unique_mcq_user").on(
      table.mcqId,
      table.userId
    ),
  })
);
