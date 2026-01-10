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
// const kafka_produser = await kafka_init.producer_instance();
let kafka_producer: any = null;

async function getProducer() {
  if (!kafka_producer) {
    kafka_producer = await kafka_init.producer_instance();
    await kafka_producer.connect(); // Ensure connection
  }
  return kafka_producer;
}

async function is_start(contest_info: TcontestTable) {
  try {
    if (new Date() > contest_info.startTime) {
      const update_contest_status = await db
        .update(contestTable)
        .set({
          status: "pending",
          is_active: true,
        })
        .where(eq(contestTable.id, contest_info.id));
      await new Promise((r) => setTimeout(r, 1000));
      const producer = await getProducer();
      producer.send({
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
    if (new Date() > contest_info.endTime) {
      const update_contest_status = await db
        .update(contestTable)
        .set({
          status: "completed",
          is_active: false,
        })
        .where(eq(contestTable.id, contest_info.id));
      await new Promise((r) => setTimeout(r, 1000));
      const producer = await getProducer();
      producer.send({
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
