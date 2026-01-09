import { db, contestTable, and, eq, or } from "@db/contest-platform";

while (true) {
  const get_all_contest = await db
    .select({
      id: contestTable.id,
      userId: contestTable.userId,
      contestName: contestTable.contestName,
      startTime: contestTable.startTime,
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

  if (get_all_contest.length !== 0) {
  }

  await new Promise((resolve, reject) => setTimeout(resolve, 5000));
}
