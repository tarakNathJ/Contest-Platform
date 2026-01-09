import { db, eq, and, contestTable, mcqTable } from "@db/contest-platform";
import {
  async_function,
  api_error,
  api_responce,
} from "@handler/contest-platform";

const create_contest_handler = async_function(async (req, res) => {
  // @ts-ignore
  const userId = req.user.id;
  const { contest_name, startTime, description } = req.body();
  if (!contest_name || !userId || !description) {
    new api_error(400, "each field are require");
  }

  const [find_this_contest_name_exist_or_not_for_this_organizer] = await db
    .select()
    .from(contestTable)
    .where(
      and(
        eq(contestTable.contestName, contestTable),
        eq(contestTable.userId, userId)
      )
    );
  if (find_this_contest_name_exist_or_not_for_this_organizer) {
    new api_error(409, " this name allrady exist");
  }
  const [create_new_contest_for_this_organizer] = await db
    .insert(contestTable)
    .values({
      userId: userId,
      contestName: contest_name,
      description: description,
      is_active: true,
      startTime: startTime,
    })
    .returning({ name: contestTable.contestName, id: contestTable.id });

  if (!create_new_contest_for_this_organizer) {
    throw new api_error(507, "db operation failed");
  }
  return res
    .status(201)
    .json(
      new api_responce(
        201,
        create_new_contest_for_this_organizer,
        "contest create success fully"
      )
    );
});

const get_organizer__contests = async_function(async (req, res) => {
  // @ts-ignore
  const userId = req.user.id;
  const get_all_contest = await db
    .select({
      id: contestTable.id,
      name: contestTable.contestName,
      startTime: contestTable.startTime,
      isActive: contestTable.is_active,
      description: contestTable.description,
    })
    .from(contestTable)
    .where(eq(contestTable.userId, userId));

  return res.status(200).json(new api_responce(200, get_all_contest));
});

const add_mcq_to_contest = async_function(async (req, res) => {
  // @ts-ignore
  const userId = req.user.id;
  const {
    title,
    description,
    option1,
    option2,
    option3,
    option4,
    ans,
    contestId,
  } = req.body;

  if (!userId || !contestId) {
    throw new api_error(400, "user info and contestId not present");
  }

  if (
    [title, description, option1, option2, option3, option4, ans].some(
      (field) => field.trim() == ""
    )
  ) {
    throw new api_error(400, "each field are require");
  }

  const [contest_exist_or_not_for_this_user] = await db
    .select({ id: contestTable.id })
    .from(contestTable)
    .where(
      and(eq(contestTable.id, contestId), eq(contestTable.userId, userId))
    );

  if (!contest_exist_or_not_for_this_user) {
    throw new api_error(404, "contest not found ");
  }

  const [create_mcq_for_this_contest] = await db
    .insert(mcqTable)
    .values({
      title: title,
      description: description,
      userId: userId,
      contestIdx: contest_exist_or_not_for_this_user.id,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      ans: ans,
    })
    .returning({ id: mcqTable.id, title: mcqTable.title });

  if (!create_mcq_for_this_contest) {
    throw new api_error(507, "db operation failed");
  }
  return res
    .status(201)
    .json(
      new api_responce(
        201,
        create_mcq_for_this_contest,
        "mcq create success fully "
      )
    );
});
