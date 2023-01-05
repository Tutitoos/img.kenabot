import { type Formats } from "./images";

export interface UserCache {
  id: string;
  avatar: {
    discordUrl: string;
    backupUrl: string;
    format: Formats;
    width: number;
    height: number;
  };
  createdAt: number;
}

export interface UserDiscord {
  id: string;
  avatar: string;
}
