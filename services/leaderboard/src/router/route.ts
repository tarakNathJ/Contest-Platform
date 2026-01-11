import { Router } from "express";
import { contest_complete } from "../controller/index.controller";
import { verify_JWT, isOrganizer } from "../middleware/index";
const route = Router();

route
  .route("/contest/result/:contestId")
  .get(verify_JWT, isOrganizer, contest_complete);

export default route;
