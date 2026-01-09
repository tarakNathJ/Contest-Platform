import express from "express";
import {verify_JWT} from "../middleware/index.middle"



const routers = express.Router();

// routers.route("/signup").post(sign_up_controller);
// routers.route("/login").post(login_controller);
// routers.route("/update-password").post(change_user_password);

export default  routers


