import "../loadEnvironments.js";

import chalk from "chalk";
import debugCreator from "debug";
import app from "./app.js";

const debug = debugCreator("system:server");

const helpMessage = `
API URL: http://localhost:{port}/
View all endpoints: http://localhost:{port}/endpoints
`;

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    try {
      const server = app.listen(port, () => {
        debug(chalk.blueBright(helpMessage.replaceAll("{port}", String(port))));

        resolve(server);
      });

      server.on("error", (error: Error) => {
        debug(chalk.redBright(`There was an error in server ${error.message}`));

        reject(error);
      });
    } catch (error: unknown) {
      debug(
        chalk.redBright(
          `There was an error in server ${(error as Error).message}`
        )
      );

      reject(error);
    }
  });

export default startServer;
