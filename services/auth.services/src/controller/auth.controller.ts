import { db, usersTable, eq } from "@db/contest-platform";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { config } from "dotenv";
import {
  async_function,
  api_error,
  api_responce,
} from "@handler/contest-platform";
import { password } from "bun";

config();

// sign up controller

export const sign_up_controller = async_function(async (req, res) => {
  const { email, name, password, role = "user" } = req.body;

  //chack email and name field are exist or not
  if ([email, name, password, role].some((field) => field?.trim() === "")) {
    throw new api_error(400, "all field are required ");
  }

  // chack, this email are exit in db of exit then return responce : sorry this email are exist in database
  const [chack_email_in_out_database] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (chack_email_in_out_database) {
    throw new api_error(
      409,
      "this email id are all rady exist try anather  email "
    );
  }

  //  generate hash and chack hash are  generate or not
  const saltRounds = bcrypt.genSaltSync(10);

  const hash_password = bcrypt.hashSync(password, saltRounds);

  if (!hash_password) {
    return new api_error(400, "password hashing are failed , try again lata");
  }

  // add new entry in our  db

  const [add_new_entry_in_our_db] = await db
    .insert(usersTable)
    .values({
      name: name,
      email: email,
      password: hash_password,
      is_active: true,
      role: role,
    })
    .returning({
      email: usersTable.email,
      role: usersTable.role,
    });
  if (!add_new_entry_in_our_db) {
    throw new api_error(400, "database entry  failed  try again");
  }
  const token = {
    email: add_new_entry_in_our_db.email,
    role: add_new_entry_in_our_db.role,
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new api_error(400, " env not exist ");
  }

  const access_token = JWT.sign(token, secret, { expiresIn: "1d" });
  if (!access_token) {
    throw new api_error(400, "  failed to create  access token  ");
  }

  return res.status(201).json(
    new api_responce(
      201,
      {
        access_token,
        email: add_new_entry_in_our_db.email,
        role: add_new_entry_in_our_db.role,
      },
      " sign up success fully "
    )
  );
});

// login controller

export const login_controller = async_function(async (req, res) => {
  const { email, password } = req.body;

  // chack required fields
  // chack user email id  are exit or not
  // then chack password
  // create access token
  // return responce
  if ([email, password].some((field) => field.trim() === "")) {
    throw new api_error(400, "all field are required");
  }

  const [chack_email_in_out_db] = await db
    .select({
      email: usersTable.email,
      password: usersTable.password,
      role: usersTable.role,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!chack_email_in_out_db) {
    throw new api_error(404, "user not found ");
  }

  const matching_password_and_hash = bcrypt.compareSync(
    password,
    chack_email_in_out_db.password
  );
  if (!matching_password_and_hash) {
    throw new api_error(401, "Invalid credentials. Password does not match");
  }
  const token = {
    email: chack_email_in_out_db.email,
    role: chack_email_in_out_db.role,
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new api_error(400, " env not exist ");
  }
  const access_token = JWT.sign(token, secret, { expiresIn: "1d" });
  if (!access_token) {
    throw new api_error(400, "  failed to create  access token  ");
  }

  return res.status(200).json(
    new api_responce(
      200,
      {
        access_token,
        email: chack_email_in_out_db.email,
        role: chack_email_in_out_db.role,
      },
      " login success fully"
    )
  );
});

// forgot password
export const change_user_password = async_function(async (req, res) => {
  // chack fields
  // chack email are exist or not then compare this  password
  // if  password match  then hash new password and update on our database
  // return responce
  const { email, old_password, new_password } = req.body;

  if (
    [email, old_password, new_password].some((field) => field.trim() === "")
  ) {
    throw new api_error(400, "all field are required ");
  }

  const [chack_email_in_out_db] = await db
    .select({ password: usersTable.password })
    .from(usersTable)
    .where(eq(usersTable.email, email));
  if (!chack_email_in_out_db) {
    throw new api_error(404, "this email are not  exit ");
  }

  const matching_password_and_hash = bcrypt.compareSync(
    old_password,
    chack_email_in_out_db.password
  );
  if (!matching_password_and_hash) {
    throw new api_error(401, "Invalid credentials. Password does not match");
  }

  //  generate hash and chack hash are  generate or not
  const saltRounds = bcrypt.genSaltSync(10);

  const hash_password = bcrypt.hashSync(new_password, saltRounds);

  if (!hash_password) {
    return new api_error(400, "password hashing are failed , try again lata");
  }

  const [update_user_password] = await db
    .update(usersTable)
    .set({ password: hash_password })
    .where(eq(usersTable.email, email)).returning();

  if (!update_user_password) {
    throw new api_error(400, "database entry  failed  try again");
  }

  return res
    .status(201)
    .json(
      new api_responce(
        201,
        { data: update_user_password },
        "success fully update your password"
      )
    );
});
