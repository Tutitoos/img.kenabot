import CustomError from "../CustomError/CustomError.js";
import connectStorage from "../storage/supabase.js";
import { Formats } from "../types/images.js";

export const backupImages = async ({
  userId,
  format,
  file,
}: {
  userId: string;
  format: Formats;
  file: Buffer;
}): Promise<{
  imageUrl: string;
  format: Formats;
}> => {
  try {
    const supabase = await connectStorage();

    await supabase.upload(`${userId}.${format}`, file, {
      contentType: `image/${format}`,
    });

    const {
      data: { publicUrl },
    } = supabase.getPublicUrl(userId);

    return {
      imageUrl: `${publicUrl}.${format}`,
      format,
    };
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      "Error renaming the image",
      500
    );
    throw customError;
  }
};

export const getImageBackup = async ({
  userId,
  format,
}: {
  userId: string;
  format: Formats;
}) => {
  try {
    const supabase = await connectStorage();

    const {
      data: { publicUrl },
    } = supabase.getPublicUrl(userId);

    return `${publicUrl}.${format}`;
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      "Error get image backup",
      500
    );
    throw customError;
  }
};
