import type { Request, Response, NextFunction } from "express";

export type type_of_asyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<type_for_responce | any>;

export type type_for_responce = {
  statuscode: number;
  data: object | null;
  message: string;
  success?: boolean;
  error?: Error | [];
  stack?: string | null;
};

export enum Tstatus {
  Activate = "activate",
  Completed = "completed",
  Started = "started",
  Pending = "pending",
  Deactivate = "deactivate",
}

export interface TcontestTable {
  id: number;
  userId: number;
  contestName: string;
  startTime: Date;
  is_active: boolean;
  status: Tstatus;
}
