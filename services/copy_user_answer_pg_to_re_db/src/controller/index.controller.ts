import { db, eq, userAnswerTable } from "@db/contest-platform";
import { redis_init } from "../index";
export const get_all_ans_for_contest = async (id: number) => {
  try {
    await new Promise((r) => setTimeout(r, 2000));
    const get_all_ans_for_contest = await db
      .select()
      .from(userAnswerTable)
      .where(eq(userAnswerTable.contest_id, id));

    if (get_all_ans_for_contest.length == 0) {
      return true;
    }
    const result = await redis_init.add_to_leaderboard(
      id,
      get_all_ans_for_contest,
      1500
    );
    return result ? true : false;
  } catch (error: any) {
    console.log(error.message || "samthing is wrong");
    return false;
  }
};
