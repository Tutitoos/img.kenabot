import environments from "./loadEnvironments.js";

import startServer from "./server/index.js";

const { port } = environments;

await startServer(+port);
