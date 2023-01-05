import cors from "cors";
import express from "express";
import morgan from "morgan";
import { generalError, notFoundEndpoint } from "./middlewares/errors.js";
import { generalRouter, userRouter, usersRouter } from "./routes/index.js";
import routes from "./routes/routes.js";

const app = express();
const { general, users, user } = routes;

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(general.root, generalRouter);
app.use(users.root, usersRouter);
app.use(user.root, userRouter);

app.use(notFoundEndpoint);
app.use(generalError);

export default app;
