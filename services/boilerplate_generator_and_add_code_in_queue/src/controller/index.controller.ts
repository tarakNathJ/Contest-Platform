import {
  api_error,
  api_responce,
  async_function,
} from "@handler/contest-platform";
import { generateCode } from "../utils/template_generater";
import prisma from "@mongo-db/contest-platform";
import {
  extractUserFunction,
  joingUserFunction,
  judge0Ids,
} from "../utils/judge0_language_template";
import { redis_service } from "@redis_instance/contestplatfrom";

const queue_name = process.env.REDIS_QUEUE_NAME;
if (!queue_name) {
  throw new Error("REDIS_QUEUE_NAME is not defined in environment variables");
}
const redis_instance = new redis_service();
redis_instance.connect();

const generate_boilerplate_code = async_function(async (req, res) => {
  const { language, signature, description, examples, title, constraints } =
    req.body;
  if (
    !language ||
    !signature ||
    !description ||
    !examples ||
    !title ||
    !constraints
  ) {
    return new api_error(
      400,
      "Language, signature, description, examples, title and constraints are required"
    );
  }
  const languageEntry = judge0Ids[language as string];
  if (!languageEntry) {
    return new api_error(400, "Unsupported programming language");
  }

  //   @ts-ignore
  const code = await generateCode({ signature, description, examples });
  if (!code) {
    return new api_error(500, "Failed to generate boilerplate code");
  }

  const saveTemplate = await prisma.problem_statement.create({
    data: {
      // @ts-ignore
      userId: req.user.id,
      language: language,
      languageId: languageEntry,
      boilerplate: code,
      inputOutputFormat: JSON.stringify(examples),
      title: title,
      constraints: constraints,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  if (!saveTemplate) {
    return new api_error(500, "Failed to save the template");
  }

  return new api_responce(200, {
    message: "Boilerplate code generated successfully",
    data: { code, templateId: saveTemplate.id },
  });
});

const get_all_qustion_templates = async_function(async (req, res) => {
  // @ts-ignore
  const userId = req.user.id;
  const templates = await prisma.problem_statement.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  return res
    .status(200)
    .json(new api_responce(200, templates, " templates fetched successfully "));
});

const get_qustion_by_id = async_function(async (req, res) => {
  const { id } = req.params;
  const template = await prisma.problem_statement.findFirst({
    where: {
      id: id,
    },
  });
  if (!template) {
    return new api_error(404, "Template not found");
  }
  const boilerplate = extractUserFunction(template.boilerplate);
  if (!boilerplate) {
    return new api_error(500, "Failed to extract boilerplate code");
  }
  template.boilerplate = boilerplate;

  return res
    .status(200)
    .json(
      new api_responce(
        200,
        { boilerplate, template },
        " boilerplate code  fetched successfully "
      )
    );
});

const submir_code_to_redis = async_function(async (req, res) => {
  //@ts-ignore
  const userId = req.user.id;

  const { code, language, problemId } = req.body;
  if (!code || !language || !problemId) {
    return new api_error(400, "code, language and problemId are required");
  }

  const get_problem_by_id = await prisma.problem_statement.findFirst({
    where: {
      id: problemId,
    },
  });
  if (!get_problem_by_id) {
    return new api_error(404, "Problem not found");
  }

  const joinedCode: string | null = joingUserFunction(
    get_problem_by_id.boilerplate,
    code
  );
  if (!joinedCode) {
    return new api_error(500, "Failed to join user code with boilerplate");
  }

  const userCodeSubmission = await prisma.user_code_submissions.create({
    data: {
      userId: userId,
      problemStatementIdx: get_problem_by_id.id,
      code: joinedCode,
      language: language,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  await redis_instance.enqueue_task(queue_name, {
    joinedCode,
    language,
    userId,
    problemId,
    submissionId: userCodeSubmission.id,
  });

  return res.status(200).json(
    new api_responce(
      200,
      {
        submissionId: userCodeSubmission.id,
      },
      " Code submitted successfully and added to the queue "
    )
  );
});

export {
  generate_boilerplate_code,
  get_all_qustion_templates,
  get_qustion_by_id,
  submir_code_to_redis,
};
