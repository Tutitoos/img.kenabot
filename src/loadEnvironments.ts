import dotenv from "dotenv";

dotenv.config();

const {
  PORT: port,
  DEBUG: debug,
  DISCORD_API_URL: discordApiUrl,
  DISCORD_TOKEN: discordToken,
  SUPABASE_URL: supabaseUrl,
  SUPABASE_KEY: supabasekey,
  SUPABASE_STORAGE_NAME: supabaseStorageName,
} = process.env;

interface Environments {
  port: number;
  debug: string;
  discordApiUrl: string;
  discordToken: string;
  supabase: {
    url: string;
    key: string;
    storageName: string;
  };
}

const environments: Environments = {
  port: +port || 4001,
  debug,
  discordApiUrl,
  discordToken,
  supabase: {
    url: supabaseUrl,
    key: supabasekey,
    storageName: supabaseStorageName,
  },
};

export default environments;
