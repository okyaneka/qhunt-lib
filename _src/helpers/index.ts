import { S3Payload } from "~/types/s3";

export const urlToBuffer = async (
  photoURL: string
): Promise<Pick<S3Payload, "buffer" | "mimetype">> => {
  const response = await fetch(photoURL);
  if (!response.ok) throw new Error("Failed to fetch image");

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mimetype =
    response.headers.get("content-type") || "application/octet-stream";

  return { buffer, mimetype };
};

export { default as bonus } from "./bonus";
export { default as db } from "./db";
export { default as model } from "./model";
export { default as qrcode } from "./qrcode";
export { default as response } from "./response";
export { default as service } from "./service";
