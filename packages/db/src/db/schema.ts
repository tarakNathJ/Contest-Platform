import {
  boolean,
  integer,
  pgTable,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { index } from "drizzle-orm/pg-core";
export const roleEnum = pgEnum("role", ["admin", "user", "organizer"]);

export const usersTable = pgTable(
  "users",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    is_active: boolean("is_active").notNull(),
    role: roleEnum("role").notNull(),
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
  })
);

export const  contestTable = pgTable(
    "contest",
    {
        id:integer("id").primaryKey().generatedAlwaysAsIdentity(),
        userId: integer("userId").references(()=>usersTable.id),
        contestId:varchar("contestId",{length:50}).notNull().unique(),
        startTime:boolean("startTime").notNull(),
        is_active: boolean("is_active").notNull(),
    },(table)=>({
        userId: index("userIdx").on(table.userId),
        contestIsActive:index("contestIdx").on(table.contestId,table.is_active),
    })
)

export const  mcqTable = pgTable(
    "mcq",
    {
        id:integer("id").primaryKey().generatedAlwaysAsIdentity(),
        contestIdx:integer("contestIdx").references(()=>contestTable.contestId),
        userId:integer("userId").references(()=>usersTable.id),
        option1:varchar("option1").notNull(),
        option2:varchar("option2").notNull(),
        option3:varchar("option3").notNull(),
        option4:varchar("option4").notNull(),
        ans:varchar("ans").notNull(),
    },
)


export const  userAnswerTable = pgTable(
    "user_ans",{
        id:integer("id").primaryKey().generatedAlwaysAsIdentity(),
        mcqTableId:integer("mcqTableId").notNull(),
        ans:varchar("ans").notNull(),
    }
)
