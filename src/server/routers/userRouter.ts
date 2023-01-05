import { Router } from "express";
import { getUserById } from "../controllers/userControllers.js";
import routes from "./routes.js";

const usersRouter = Router();
const { user } = routes.user;

usersRouter.get(user, getUserById);

export default usersRouter;
