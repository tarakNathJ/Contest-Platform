import { Router } from "express";
import {
  generate_boilerplate_code,
  get_all_qustion_templates,
  get_qustion_by_id,
} from "../controller/index.controller";
import {
  verify_JWT,
  isOrganizer,
  isUser,
} from "../middleware/index.middleware";
const router = Router();

router
  .route("/boilerplate/generate")
  .post(verify_JWT, isOrganizer, generate_boilerplate_code);
router
  .route("/boilerplate/templates")
  .get(verify_JWT, isUser, get_all_qustion_templates);
router
  .route("/boilerplate/template/:id")
  .get(verify_JWT, isUser, get_qustion_by_id);



export default router;