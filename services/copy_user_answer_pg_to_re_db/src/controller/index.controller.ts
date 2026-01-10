import {
  db,
  eq,
  inArray,
  userAnswerTable,
  mcqTable,
} from "@db/contest-platform";
import { redis_init } from "../index";

interface UserScore {
  userId: number;
  correctAttempts: number;
  totalAttempts: number;
  score: number;
}

export const get_all_ans_for_contest = async (contestArray: number) => {
  try {
    await new Promise((r) => setTimeout(r, 1000));
    const get_all_ans_for_contest = await db
      .select()
      .from(userAnswerTable)
      .where(eq(userAnswerTable.contest_id, contestArray));
    await new Promise((r) => setTimeout(r, 1000));
    const get_all_qustion_for_contest = await db
      .select()
      .from(mcqTable)
      .where(eq(mcqTable.contestId, contestArray));

    if (get_all_ans_for_contest.length == 0) {
      return true;
    }
    console.log("Answers:", get_all_ans_for_contest.length);
    console.log("Questions:", get_all_qustion_for_contest.length);
    const userScoresMap = new Map<number, UserScore>();

    get_all_ans_for_contest.forEach((answer) => {
      const userId = answer.user_id;

      if (!userScoresMap.has(userId)) {
        userScoresMap.set(userId, {
          userId: userId,
          correctAttempts: 0,
          totalAttempts: 0,
          score: 0,
        });
      }

      const userScore = userScoresMap.get(userId)!;
      userScore.totalAttempts++;

      if (answer.is_correct) {
        userScore.correctAttempts++;
      }

      // Calculate score: +10 for correct, -2 for wrong
      userScore.score =
        userScore.correctAttempts * 10 -
        (userScore.totalAttempts - userScore.correctAttempts) * 2;
    });

    // Convert map to array
    const userScores = Array.from(userScoresMap.values());

    console.log("User scores:", userScores);

    // Add to Redis leaderboard
    const result: boolean = await redis_init.add_to_leaderboard(
      contestArray,
      userScores,
      1500
    );
    return result ? true : false;
  } catch (error: any) {
    console.log(error.message || "samthing is wrong");
    return false;
  }
};
