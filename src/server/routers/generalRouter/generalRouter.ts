import { Router } from "express";
import { getEndpoints, getPing } from "../../controllers/generalControllers.js";
import routes from "../routes.js";

const generalRouter = Router();
const { ping, endpoints } = routes.general;

generalRouter.get(ping, getPing);
generalRouter.get(endpoints, getEndpoints);

export default generalRouter;
