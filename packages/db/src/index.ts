import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { and , eq, ne, gt, gte,lt ,lte ,exists ,notExists ,isNotNull ,isNull  } from 'drizzle-orm';
import {usersTable ,userAnswerTable ,mcqTable ,contestTable ,roleEnum ,statusEnum} from "./db/schema"
const db = drizzle(process.env.DATABASE_URL!);



export {db ,and, eq, ne, gt, gte,lt ,lte ,exists ,notExists ,isNotNull ,isNull ,userAnswerTable ,usersTable,contestTable,mcqTable ,roleEnum ,statusEnum }