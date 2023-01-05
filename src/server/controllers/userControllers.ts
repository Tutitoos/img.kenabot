import { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import { usersCache } from "../../index.js";
import { backupImages, getImageBackup } from "../../utils/backupImages.js";
import { imageOptions, optimizeImages } from "../../utils/optimizeImages.js";
import { config } from "../middlewares/manageCaches.js";
import { getImageBuffer, getUser } from "../services/discordServices.js";

interface CustomRequestUserById extends Request {
  params: {
    userId: string;
  };
  query: {
    width: string;
    height: string;
  };
}

export const getUserById = async (
  req: CustomRequestUserById,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { width, height } = imageOptions(req.query);

  try {
    if (!userId) {
      throw new CustomError(
        `The id (${userId}) provided is not valid`,
        "The id provided is not valid",
        404
      );
    }

    let status = 200;
    const user = usersCache.find((user) => user.id === userId);
    let avatar: string;
    let format: string;

    if (!user) {
      const dateNew = Date.now();
      const userData = await getUser(userId);

      if (!userData) {
        throw new CustomError(
          `The user searched by id (${userId}) provided does not exist`,
          "The user searched does not exist",
          404
        );
      }

      const imageBuffer = await getImageBuffer(userData.avatar);
      const imageOptimize = await optimizeImages({
        width,
        height,
        format: userData.format,
        file: imageBuffer,
      });
      const imageBackup = await backupImages({
        userId: userData.id,
        format: imageOptimize.format,
        file: imageOptimize.file,
      });

      status = 201;
      format = imageBackup.format;
      avatar = imageBackup.imageUrl;
      usersCache.push({
        id: userData.id,
        avatar: {
          discordUrl: userData.avatar,
          backupUrl: imageBackup.imageUrl,
          format: imageBackup.format,
          width,
          height,
        },
        createdAt: dateNew + config.createdAt,
      });
    } else {
      format = user.avatar.format;
      avatar = await getImageBackup({
        userId: user.id,
        format: user.avatar.format,
      });
    }

    const imageBuffer = await getImageBuffer(avatar);

    return res
      .status(status)
      .setHeader("Content-Type", `image/${format}`)
      .setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
      .send(imageBuffer);
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      (error as CustomError).publicMessage || "Error when show avatar user",
      (error as CustomError).statusCode ?? 500
    );

    next(customError);
  }
};
