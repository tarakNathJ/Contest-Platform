import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import {  eq, ne, gt, gte,lt ,lte ,exists ,notExists ,isNotNull ,isNull  } from 'drizzle-orm';
import {usersTable ,userAnswerTable ,mcqTable ,contestTable} from "./db/schema"
const db = drizzle(process.env.DATABASE_URL!);



export {db , eq, ne, gt, gte,lt ,lte ,exists ,notExists ,isNotNull ,isNull ,userAnswerTable ,usersTable,contestTable,mcqTable }