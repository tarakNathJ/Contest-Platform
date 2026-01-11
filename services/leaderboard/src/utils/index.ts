import { db, userAnswerTable, eq, mcqTable } from "@db/contest-platform";

export async function getContestResults(contestId: number) {
  // Get all MCQs for the contest
  const mcqs = await db
    .select()
    .from(mcqTable)
    .where(eq(mcqTable.contestId, contestId));

  const totalQuestions = mcqs.length;

  // Get all user answers for this contest
  const userAnswers = await db
    .select({
      userId: userAnswerTable.user_id,
      isCorrect: userAnswerTable.is_correct,
      mcqId: userAnswerTable.mcqId,
    })
    .from(userAnswerTable)
    .where(eq(userAnswerTable.contest_id, contestId));

  // Group answers by user
  const userStats = new Map<
    number,
    {
      correctAttempts: number;
      totalAttempts: number;
      score: number;
    }
  >();

  userAnswers.forEach((answer) => {
    const userId = answer.userId;

    if (!userStats.has(userId)) {
      userStats.set(userId, {
        correctAttempts: 0,
        totalAttempts: 0,
        score: 0,
      });
    }

    const stats = userStats.get(userId)!;
    stats.totalAttempts++;

    if (answer.isCorrect) {
      stats.correctAttempts++;
      stats.score += 10;
    }
  });

  const results = Array.from(userStats.entries()).map(([userId, stats]) => ({
    userId,
    score: stats.score,
    correctAttempts: stats.correctAttempts,
    totalAttempts: stats.totalAttempts,
    accuracy:
      stats.totalAttempts > 0
        ? parseFloat(
            ((stats.correctAttempts / stats.totalAttempts) * 100).toFixed(2)
          )
        : 0,
  }));

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.accuracy - a.accuracy;
  });

  // Add rank
  const rankedResults = results.map((result, index) => ({
    rank: index + 1,
    ...result,
  }));

  return rankedResults;
}
