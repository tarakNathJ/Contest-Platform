import { redis_service } from "@redis_instance/contestplatfrom";
import { kafka_instance } from "@kafka_instance/contestplatfrom";
import { CronJob } from "cron";
import { get_all_ans_for_contest } from "./controller/index.controller";
import { contestResultTable, db } from "@db/contest-platform";
const redis_list = process.env.CONTEST_KEY_FOR_REDIS_LIST;
const clientId = process.env.CLIENT_ID;
const brocker = process.env.BROKER;
const topic = process.env.TOPIC;
const redis_url = process.env.REDIS_URL;
const groupId = process.env.GROUP_ID;
if (!redis_url || !brocker || !clientId || !groupId || !topic || !redis_list) {
  throw new Error("env are not exist");
}

let contest_list: number[] = [];
export const redis_init = new redis_service();
redis_init.connect();

const data = await redis_init.get_leaderboard_by_contestId(1);
console.log(data);
const kafka_init = new kafka_instance(clientId, [brocker]);

const consumer = await kafka_init.consumer_instance(topic, true, groupId);
consumer?.run({
  eachMessage: async ({ topic, partition, message }) => {
    try {
      const value = message.value?.toString();
      if (!value) return;
      const payload = JSON.parse(value);
      console.log(payload);

      if (payload.type == "CONTEST_START") {
        redis_init.array_init_or_push(redis_list, payload.value.id);

        contest_list.push(payload.value.id);
      } else if (payload.type == "CONTEST_END") {
        const get_leaderbord_data =
          await redis_init.get_leaderboard_by_contestId(payload.value.id);

        // store in db
        await db
          .insert(contestResultTable)
          .values({
            contest_id: payload.value.id,
            result: { ...get_leaderbord_data },
          })
          .onConflictDoUpdate({
            target: [contestResultTable.contest_id],
            set: {
              result: { ...get_leaderbord_data },
            },
          });
        // delete for db
        await redis_init.delete_element_by_value(redis_list, payload.value.id);
        const new_contest_list = contest_list.filter(
          (num) => num != payload.value.id
        );
        contest_list = new_contest_list;
      }

      await consumer.commitOffsets([
        {
          topic,
          partition,
          offset: (Number(message.offset) + 1).toString(),
        },
      ]);
    } catch (error: any) {
      throw new Error(error.message || "samthing is wrong  for consumer");
    }
  },
});

const job = new CronJob(
  "0 * * * * *", // every 1 minute
  async () => {
    await init_cron_worker();
  }
);

job.start();

async function init_cron_worker() {
  try {
    job.stop();
    if (contest_list.length == 0) {
      const data: number[] = await redis_init.get_all_contest_list(redis_list!);
      if (data.length == 0) {
        console.log("restart");
        job.start();
        return true;
      }
      contest_list = data;
    }

    let status;
    console.log("list : ", contest_list);
    for (let value of contest_list) {
      status = await get_all_ans_for_contest(value);
      console.log("result : ", status);
    }

    job.start();
    return status ? true : false;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

// const obj2 = { ...arr };
// console.log(obj2);
