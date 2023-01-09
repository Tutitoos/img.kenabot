import environments from "./loadEnvironments.js";

import startServer from "./server/index.js";
import manageCaches from "./server/middlewares/manageCaches.js";

const { port } = environments;

await startServer(+port);
await manageCaches();
