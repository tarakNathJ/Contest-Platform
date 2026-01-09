import express from "express";
import {
  verify_JWT,
  isAdmin,
  isOrganizer,
  isUser,
} from "../middleware/index.middle";
import {
  create_contest,
  get_mcqs_by_contest_id,
  get_organizer__contests,
  add_and_update_mcq_to_contest,
  submit_user_answer,
} from "../controller/index.controller";

const routers = express.Router();

routers.route("/creat-contest").post(verify_JWT, isOrganizer, create_contest);
routers
  .route("/get-qustion/:contestId")
  .get(verify_JWT, get_mcqs_by_contest_id);
routers
  .route("/get-all-contests")
  .get(verify_JWT, isOrganizer, get_organizer__contests);
routers
  .route("/add-qustion")
  .post(verify_JWT, isOrganizer, add_and_update_mcq_to_contest);
routers.route("/submit-answer/:qustionId/:contestId").post(verify_JWT, isUser, submit_user_answer);

export default routers;
