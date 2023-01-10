import sharp from "sharp";
import CustomError from "../CustomError/CustomError.js";
import { type Formats } from "../types/images.js";

export const optimizeImages = async ({
  file,
  format,
}: {
  file: Buffer;
  format: Formats;
}): Promise<{
  file: Buffer;
  format: Formats;
}> => {
  try {
    const formatImage = format === "gif" ? "gif" : "webp";
    let imageBuffer = file;

    if (format !== "gif") {
      const image = sharp(file)
        .resize(128, 128, { fit: "contain" })
        .webp({ quality: 100 })
        .toFormat(formatImage);
      imageBuffer = await image.toBuffer();
    }

    return {
      file: imageBuffer,
      format: formatImage,
    };
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      "Error compress the image",
      500
    );
    throw customError;
  }
};
