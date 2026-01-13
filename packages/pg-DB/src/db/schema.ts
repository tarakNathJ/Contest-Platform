

import {
  boolean,
  integer,
  pgTable,
  varchar,
  pgEnum,
  uniqueIndex,
  timestamp,
  index,
  jsonb
  
} from "drizzle-orm/pg-core";


export const roleEnum = pgEnum("role", ["admin", "user", "organizer"]);

export const statusEnum = pgEnum("status", [
  "activate",
  "completed",
  "started",
  "pending",
  "deactivate",
]);

export const answerEnum = pgEnum("option", [
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
    userIdIdx: index("userIdx").on(table.userId),
    contestIsActiveIdx: index("contestIdx").on(table.contestName, table.is_active),
    contestNameIdx: index("contestNameIdx").on(table.contestName, table.userId),
  })
);


export const mcqTable = pgTable(
  "mcq",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    contestId: integer("contestId")
      .notNull()
      .references(() => contestTable.id),
    userId: integer("userId")
      .notNull()
      .references(() => usersTable.id),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description").notNull(),
    option1: varchar("option1").notNull(),
    option2: varchar("option2").notNull(),
    option3: varchar("option3").notNull(),
    option4: varchar("option4").notNull(),
    rightAns: varchar("rightAns").notNull(),
  },
  (table) => ({
    contestIdIdx: index("mcq_contest_id_idx").on(table.contestId),
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
    contest_id: integer("contest_id").references(() => contestTable.id),
    user_id: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    mcqId: integer("mcqId")
      .notNull()
      .references(() => mcqTable.id, { onDelete: "cascade" }),
    ans: answerEnum("ans").notNull(),
    selectedAnswer: varchar("selectedAnswer").notNull(),
    is_correct: boolean("is_correct").notNull(),
  },
  (table) => ({
    mcqIdIdx: index("user_answers_mcq_id_idx").on(table.mcqId),
    userIdIdx: index("user_answers_user_id_idx").on(table.user_id),
    contestIdIdx: index("contestIdIdx").on(table.contest_id),
    oneAttemptPerUser: uniqueIndex("user_answers_unique_mcq_user").on(
      table.mcqId,
      table.user_id
    ),
  })
);


export const contestResultTable = pgTable("contest_result",{
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  contest_id: integer("contest_id").references(() => contestTable.id).unique(),
  result:jsonb("result").notNull()
},(table)=>({
  contestIdx:index("contest_idx").on(table.contest_id)
}))

export type ContestResult = typeof contestResultTable.$inferSelect
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
export type Contest = typeof contestTable.$inferSelect;
export type NewContest = typeof contestTable.$inferInsert;
export type Mcq = typeof mcqTable.$inferSelect;
export type NewMcq = typeof mcqTable.$inferInsert;
export type UserAnswer = typeof userAnswerTable.$inferSelect;
export type NewUserAnswer = typeof userAnswerTable.$inferInsert;