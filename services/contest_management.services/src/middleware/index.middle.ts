import JWT from "jsonwebtoken";
import { config } from "dotenv";
import {async_function , api_error } from "@handler/contest-platform";

import { db, usersTable, eq } from "@db/contest-platform";

config();

export const verify_JWT =async_function (async (req, _, next) => {
  try {
    console.log("rt")
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log(token);
    if (!token) {
      throw new api_error(401, "Unauthorized request", Error.prototype);
    }
    const ACCESS_TOKEN = process.env.JWT_SECRET;
    if (!ACCESS_TOKEN) {
      throw new api_error(401, "env not exist", Error.prototype);
    }

    const decodedToken = JWT.verify(token, ACCESS_TOKEN) as { email: string };

    if (!decodedToken || !decodedToken?.email) {
      throw new api_error(401, "Invalid Access Token", Error.prototype);
    }

    const [existe_user] = await db
      .select({
        role: usersTable.role,
        id: usersTable.id,
      })
      .from(usersTable)
      .where(eq(usersTable.email, decodedToken.email));

    if (!existe_user || !existe_user === undefined) {
      throw new api_error(401, "user not exist", Error.prototype);
    }
    // console.log(user);
    // @ts-ignore
    req.user = existe_user;
    console.log("rt")
    next();
  } catch (error: any) {
    throw new api_error(
      401,
      error?.message || "Invalid access token",
      Error.prototype
    );
  }
});

export const isUser = async_function(async (req, res, next) => {
  try {
    // @ts-ignore
    if (req.user.role === "organizer") {
      throw new api_error(401, "this is not organizer route");
      // @ts-ignore
    } else if (req.user.role === "admin") {
      throw new api_error(401, "this is not admin route");
    }
    next();
  } catch (error: any) {
    throw new api_error(401, "role cannot be verified");
  }
});

export const isAdmin = async_function(async (req, _, next) => {
  try {
    // @ts-ignore
    if (req.user.role === "organizer") {
      throw new api_error(401, "this is not organizer route");
      // @ts-ignore
    } else if (req.user.role === "user") {
      throw new api_error(401, "this is not user route");
    }
    next();
  } catch (error: any) {
    throw new api_error(401, "role cannot be verified");
  }
});
export const isOrganizer = async_function(async (req, _, next) => {
  try {
    console.log("dt")
    // @ts-ignore
    if (req.user.role === "admin") {
      throw new api_error(401, "this is not organizer route");
      // @ts-ignore
    } else if (req.user.role === "user") {
      throw new api_error(401, "this is not user route");
    }
    console.log("dt")
    next();
  } catch (error: any) {
    throw new api_error(401, "role cannot be verified");
  }
});
