import { db, contestTable, and, eq, or } from "@db/contest-platform";
import { is_end, is_start } from "./controller/index.controller";
import type { TcontestTable } from "@type-of/contest-platform";
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
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  if (get_all_contest.length !== 0) {
    get_all_contest.forEach(async (contest: TcontestTable) => {
      switch (contest.status) {
        case "activate":
          await is_start(contest);
          break;
        case "started":
          await is_start(contest);
          break;
        case "pending":
          is_end(contest);
          break;
        default:
          break;
      }
    });
  }

  await new Promise((resolve, reject) => setTimeout(resolve, 5000));
}
