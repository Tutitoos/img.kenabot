import { Router } from "express";
import { getUsers } from "../controllers/usersControllers.js";
import routes from "./routes.js";

const usersRouter = Router();
const { list } = routes.users;

usersRouter.get(list, getUsers);

export default usersRouter;
