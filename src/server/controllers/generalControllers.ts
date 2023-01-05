import { Request, Response } from "express";
import routes from "../routes/routes.js";

const { general, users, user } = routes;

export const getPing = async (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Pong 🏓",
  });
};

export const getEndpoints = async (req: Request, res: Response) => {
  return res.status(200).json({
    message: "List of endpoints",
    general: {
      [general.ping]: "Get a ping from the API",
      [general.endpoints]: "Get all endpoints list",
    },
    users: {
      [users.root]: "Get all users in cache list",
    },
    user: {
      [user.root + user.user]: "Get a user for userId",
    },
  });
};
