import "../../loadEnvironments.js";

import chalk from "chalk";
import debugCreator from "debug";
import type { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";

const debug = debugCreator("system:errors");

export const notFoundEndpoint = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customError = new CustomError(
    `Endpoint not found (${req.url})`,
    "Endpoint not found",
    404
  );

  next(customError);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const publicMessage = error.publicMessage || "General error";

  debug(
    chalk.redBright(
      `There was an status ${statusCode} and error ${error.message}`
    )
  );

  res.status(statusCode).json({
    message: publicMessage,
  });
};
