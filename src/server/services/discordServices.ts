import axios from "axios";
import CustomError from "../../CustomError/CustomError.js";
import environments from "../../loadEnvironments.js";
import { type Formats } from "../../types/images.js";
import { type UserDiscord } from "../../types/users.js";

const { discordApiUrl, discordToken } = environments;

export const getUser = async (
  userId: string
): Promise<{
  id: string;
  avatar: string;
  format: Formats;
}> => {
  try {
    const response = await axios.get<UserDiscord>(
      `${discordApiUrl}users/${userId}`,
      {
        headers: {
          authorization: `Bot ${discordToken}`,
        },
      }
    );
    const responseData = response.data;

    const discordUrl = `https://cdn.discordapp.com/avatars/${responseData.id}/${responseData.avatar}.gif`;

    const imageBuffer = await getImageBuffer(discordUrl);
    const format = imageBuffer ? "gif" : "png";

    return {
      id: responseData.id,
      avatar: `https://cdn.discordapp.com/avatars/${responseData.id}/${responseData.avatar}.${format}`,
      format,
    };
  } catch (error: unknown) {
    if ((error as Error).message.includes("Unauthorized")) {
      throw new CustomError(
        (error as Error).message,
        (error as CustomError).publicMessage || "Error when show user",
        (error as CustomError).statusCode ?? 500
      );
    }

    return null;
  }
};

export const getImageBuffer = async (imageUrl: string): Promise<Buffer> => {
  try {
    const response = await axios.get<Buffer>(imageUrl, {
      responseType: "arraybuffer",
    });
    const responseData = response.data;

    return responseData;
  } catch {
    return null;
  }
};
