import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { and,or , eq, ne, gt, gte,lt ,lte ,exists ,notExists ,isNotNull ,isNull ,inArray  } from 'drizzle-orm';
import {usersTable ,userAnswerTable ,mcqTable ,contestTable ,roleEnum ,statusEnum ,contestResultTable} from "./db/schema"
const db = drizzle(process.env.DATABASE_URL!);



export {db ,or ,and, eq, ne, gt, gte,lt ,lte ,exists ,notExists ,isNotNull,inArray ,isNull ,userAnswerTable ,usersTable,contestTable,mcqTable ,roleEnum ,statusEnum ,contestResultTable }