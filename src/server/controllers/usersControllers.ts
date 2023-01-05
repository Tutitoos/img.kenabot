import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import { usersCache } from "../../index.js";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
      .json(usersCache);
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      (error as CustomError).publicMessage || "Error when show list of users",
      (error as CustomError).statusCode ?? 500
    );

    next(customError);
  }
};
