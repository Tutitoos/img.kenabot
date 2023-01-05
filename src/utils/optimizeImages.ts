import sharp from "sharp";
import CustomError from "../CustomError/CustomError.js";
import { type Formats, type ImageOptionsProps } from "../types/images.js";

export const optimizeImages = async ({
  file,
  format,
  width,
  height,
}: {
  file: Buffer;
  format: Formats;
  width: number;
  height: number;
}): Promise<{
  file: Buffer;
  format: Formats;
}> => {
  try {
    const formatImage = format === "gif" ? "gif" : "webp";
    let imageBuffer = file;

    if (format !== "gif") {
      const image = sharp(file)
        .resize(width, height, { fit: "contain" })
        .webp({ quality: 90 })
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

export const imageOptions = ({
  width,
  height,
}: ImageOptionsProps): {
  width: number;
  height: number;
} => ({
  width: parseFloat(width ?? "128"),
  height: parseFloat(height ?? "128"),
});
