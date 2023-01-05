import environments from "./loadEnvironments.js";

import startServer from "./server/index.js";
import { type UserCache } from "./types/users.js";

const { port } = environments;

await startServer(Number(port));

export const usersCache: UserCache[] = [];
