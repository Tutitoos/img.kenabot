import environments from "./loadEnvironments.js";

import startServer from "./server/index.js";
import { UserCache } from "./types/users.js";

const { port } = environments;

await startServer(+port);

export const usersCache: UserCache[] = [];
