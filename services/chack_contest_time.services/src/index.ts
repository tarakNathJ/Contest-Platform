import { db, contestTable, and, eq, or } from "@db/contest-platform";
import { is_end, is_start } from "./controller/index.controller";
import type { TcontestTable } from "@type-of/contest-platform";
import { config } from "dotenv";
config();
async function chack_time_for_contest() {
  try {
    while (true) {
      const get_all_contest: TcontestTable[] | any = await db
        .select({
          id: contestTable.id,
          userId: contestTable.userId,
          contestName: contestTable.contestName,
          startTime: contestTable.startTime,
          endTime: contestTable.endTime,
          is_active: contestTable.is_active,
          status: contestTable.status,
        })
        .from(contestTable)
        .where(
          or(
            eq(contestTable.status, "activate"),
            eq(contestTable.status, "started"),
            eq(contestTable.status, "pending")
          )
        );

        console.log(get_all_contest);
      await new Promise((r) => setTimeout(r, 1000));

      if (get_all_contest.length !== 0) {
        for (const contest of get_all_contest) {
          switch (contest.status) {
            case "activate":
            case "started":
              await is_start(contest);
              break;
            case "pending":
              await is_end(contest);
              break;
          }
        }
      }
      await new Promise((r) => setTimeout(r, 5000));
    }
  } catch (error: any) {
    console.error("error message ", error.messages);
    console.error("Error in check_time_for_contest:", error.message || error);
    console.error("Full error:", error);

    // Don't silently fail - restart the check after a delay
    // await new Promise((r) => setTimeout(r, 10000));
    // chack_time_for_contest();
  }
}

chack_time_for_contest();
