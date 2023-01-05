import environments from "../loadEnvironments.js";

import { createClient } from "@supabase/supabase-js";
import chalk from "chalk";
import debugCreator from "debug";

const debug = debugCreator("system:storage");
const {
  supabase: { url, key, storageName },
} = environments;

const connectStorage = async () => {
  try {
    const connection = createClient(url, key);

    const storage = await connection.storage.from(storageName);
    const storageList = await storage.list();

    if (storageList.error) throw storageList.error;

    debug(chalk.blueBright("Connected"));

    return storage;
  } catch (error: unknown) {
    debug(
      chalk.redBright(
        `There was an error in storage ${(error as Error).message}`
      )
    );

    return null;
  }
};

export default connectStorage;
