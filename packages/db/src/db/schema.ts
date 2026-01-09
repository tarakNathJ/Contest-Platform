import {
  boolean,
  integer,
  pgTable,
  varchar,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { index } from "drizzle-orm/pg-core";
export const roleEnum = pgEnum("role", ["admin", "user", "organizer"]);
export const statusEnum = pgEnum("status", ["activate", "deactivate"]);
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
      .references(() => usersTable.id)
      .notNull(),
    contestName: varchar("contestName", { length: 50 }).notNull().unique(),
    description: varchar("description"),
    startTime: boolean("startTime").notNull(),
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
    contestIdx: integer("contestIdx")
      .references(() => contestTable.id)
      .notNull(),
    userId: integer("userId")
      .references(() => usersTable.id)
      .notNull(),
    title: varchar("title").notNull(),
    description: varchar("description").notNull(),
    option1: varchar("option1").notNull(),
    option2: varchar("option2").notNull(),
    option3: varchar("option3").notNull(),
    option4: varchar("option4").notNull(),
    ans: varchar("ans").notNull(),
  },
  (table) => ({
    title_contest_id: uniqueIndex("title_contest_unique").on(
      table.contestIdx,
      table.title
    ),
  })
);

export const userAnswerTable = pgTable("user_ans", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  mcqTableId: integer("mcqTableId")
    .references(() => mcqTable.id)
    .notNull(),
  ans: varchar("ans").notNull(),
  optionId: varchar("optionId").notNull(),
  right_or_wrong: boolean("right_or_wrong").notNull(),
});
