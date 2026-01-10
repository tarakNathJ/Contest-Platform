import type { TcontestTable } from "@type-of/contest-platform";
import { kafka_instance } from "@kafka_instance/contestplatfrom";
import { db, contestTable, eq } from "@db/contest-platform";
const client_id: string = process.env.CLIENT_ID!;
const broker: string = process.env.BROKER!;
const topic: string = process.env.TOPIC!;
if (!client_id || !broker || !topic) {
  throw new Error("env not exist");
}

const kafka_init = new kafka_instance(client_id, [broker]);
const kafka_produser = await kafka_init.producer_instance();

async function is_start(contest_info: TcontestTable) {
  try {
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    if (new Date() > contest_info.startTime) {
      const update_contest_status = await db
        .update(contestTable)
        .set({
          status: "pending",
        })
        .where(eq(contestTable.id, contest_info.id));

      kafka_produser?.send({
        topic: topic,
        messages: [
          {
            value: JSON.stringify({
              type: "CONTEST_START",
              value: contest_info,
            }),
          },
        ],
      });
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
      return { status: true };
    } else {
      return { status: false };
    }
  } catch (error: any) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return {
      status: false,
      error: errorMessage,
    };
  }
}

async function is_end(contest_info: TcontestTable) {
  try {
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    if (new Date() > contest_info.endTime) {
      const update_contest_status = await db
        .update(contestTable)
        .set({
          status: "completed",
        })
        .where(eq(contestTable.id, contest_info.id));

      kafka_produser?.send({
        topic: topic,
        messages: [
          {
            value: JSON.stringify({
              type: "CONTEST_END",
              value: contest_info,
            }),
          },
        ],
      });
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
      return { status: true };
    } else {
      return { status: false };
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return {
      status: false,
      error: errorMessage,
    };
  }
}

export { is_end, is_start };
