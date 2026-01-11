import {
  api_error,
  api_responce,
  async_function,
} from "@handler/contest-platform";
import { db, contestResultTable, eq } from "@db/contest-platform";
import { getContestResults } from "../utils";

const contest_complete = async_function(async (req, res) => {
  // @ts-ignore
  const userId = req.user.id;
  const contestId = req.params.contestId;
  if (!contestId) {
    throw new api_error(400, "All required fields must be provided.");
  }

  const [get_user_contest_result] = await db
    .select({ data: contestResultTable.result })
    .from(contestResultTable)
    .where(eq(contestResultTable.contest_id, parseInt(contestId)));

  if (get_user_contest_result) {
    return res
      .status(200)
      .json(
        new api_responce(
          200,
          get_user_contest_result,
          " success fully get contest leaderboard "
        )
      );
  } else {
    const result = await getContestResults(parseInt(contestId));
    if (!result) {
      throw new api_error(507, "db operation failed");
    }
    return res
      .status(200)
      .json(
        new api_responce(200, result, " success fully get contest leaderboard ")
      );
  }
});
