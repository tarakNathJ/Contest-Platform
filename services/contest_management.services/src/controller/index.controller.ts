import {
  db,
  eq,
  and,
  contestTable,
  mcqTable,
  statusEnum,
  userAnswerTable,
} from "@db/contest-platform";
import {
  async_function,
  api_error,
  api_responce,
} from "@handler/contest-platform";
import { redis_service } from "@redis_instance/contestplatfrom";
interface Tmcq {
  id: number;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  ans: string;
}
const redis_instance = new redis_service();
const redis_connect = await redis_instance.connect();

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
      status: statusEnum.enumValues[0],
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

const add_and_update_mcq_to_contest = async_function(async (req, res) => {
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
    .onConflictDoUpdate({
      target: [mcqTable.contestIdx, mcqTable.title],
      set: {
        description: description,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        ans: ans,
      },
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
const get_mcqs_by_contest_id = async_function(async (req, res) => {
  const contestId = req.params;
  // @ts-ignore
  const userId = req.user.id;

  if (!contestId || !userId) {
    throw new api_error(400, "user and contest id not found");
  }

  const [chack_contest_are_exist_or_not] = await db
    .select()
    .from(contestTable)
    .where(
      and(
        //@ts-ignore
        eq(contestTable.id, parseInt(contestId)),
        eq(contestTable.userId, userId)
      )
    );

  if (!chack_contest_are_exist_or_not) {
    throw new api_error(404, " contest are not exist  ");
  }

  const [get_all_mcq_for_this_contestTable] = await db
    .select()
    .from(mcqTable)
    .where(eq(mcqTable.contestIdx, chack_contest_are_exist_or_not.id));
  return res
    .status(200)
    .json(
      new api_responce(
        200,
        { get_all_mcq_for_this_contestTable },
        "that's your msc qustion"
      )
    );
});
const submit_user_answer = async_function(async (req, res) => {
  // @ts-ignore
  const userId = req.user.id;
  const qustionId = req.params;
  const contestId = req.params;
  const { ans, optionId } = req.body;

  const get_contest_exist_or_not: Tmcq[] | any = await redis_instance.getJSON(
    `${contestId}`
  );
  if (get_contest_exist_or_not) {
    const find_qustion_details = get_contest_exist_or_not.filter(
      //@ts-ignore
      (data) => data.id == parseInt(qustionId)
    );
    const save_user_answer = await db.insert(userAnswerTable).values({
      //@ts-ignore
      mcqTableId: parseInt(qustionId),
      ans: ans,
      optionId: optionId,
      right_or_wrong: find_qustion_details[0]?.ans == ans.trim() ? true : false,
    });
    return res
      .status(201)
      .json(new api_responce(201, {}, "Data saved successfully"));
  } else {
    const get_all_qustion_by_contest_id = await db
      .select({
        id: mcqTable.id,
        option1: mcqTable.option1,
        option2: mcqTable.option2,
        option3: mcqTable.option3,
        option4: mcqTable.option4,
        ans: mcqTable.ans,
      })
      .from(mcqTable)
      //@ts-ignore
      .where(eq(mcqTable.contestIdx, parseInt(contestId)));
    redis_instance.setJSON(`${contestId}`, get_all_qustion_by_contest_id, 60);
    const find_qustion_details = get_all_qustion_by_contest_id.filter(
      //@ts-ignore
      (data) => data.id == parseInt(qustionId)
    );

    const save_user_answer = await db.insert(userAnswerTable).values({
      //@ts-ignore
      mcqTableId: parseInt(qustionId),
      ans: ans,
      optionId: optionId,
      right_or_wrong: find_qustion_details[0]?.ans == ans.trim() ? true : false,
    });
    return res
      .status(201)
      .json(new api_responce(201, {}, "Data saved successfully"));
  }

  
});
