import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { sign } from "hono/jwt";
import dotenv from "dotenv";
import type { Context } from "hono";
import { setSignedCookie } from "hono/cookie";
import type { IAdmin, IUser } from "./../interfaces/index.js";
dotenv.config();

const DOMAIN = process.env.DOMAIN as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;

const COOKIE_SECRET = process.env.COOKIE_SECRET as string;

// Validate query parameters
export const isValidDate = (val: string) => !isNaN(Date.parse(val));

// Upload Avatar to S3
export const uploadAvatar = async ({
  s3,
  file,
  key,
  fileType = "image/webp",
  bucketName,
}: {
  s3: S3Client;
  file: File;
  key: string;
  fileType?: string;
  bucketName?: string;
}) => {
  try {
    const arrayBuffer = await file.arrayBuffer(); // Convert file to Buffer
    const buffer = Buffer.from(arrayBuffer);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key, // Save inside an 'uploads' folder
      ContentType: fileType,
      Body: buffer,
    });

    await s3.send(command);
  } catch (error: any) {
    throw new Error(error.message || "Failed to upload avatar");
  }
};

// Generate Access Token
export const generateAccessToken = async ({
  user,
  expMinutes = 15,
}: {
  user: IUser | IAdmin;
  expMinutes?: number;
}) => {
  console.log(user);

  const token = await sign(
    {
      _id: user._id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * expMinutes,
    },
    JWT_ACCESS_SECRET
  );

  if (!token) {
    throw new Error("Token generation failed");
  }

  return token;
};

// Generate Refresh Token
export const generateRefreshToken = async ({
  user,
  expDays = 30,
}: {
  user: IUser | IAdmin;
  expDays?: number;
}) => {
  const token = await sign(
    {
      _id: user._id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * expDays,
      // exp: Math.floor(Date.now() / 1000) + 60 * 5,
    },
    JWT_REFRESH_SECRET as string
  );

  if (!token) {
    throw new Error("Token generated failed");
  }
  return token;
};

export const setAuthCookie = async (
  c: Context,
  name: string,
  value: string,
  maxAgeSeconds: number
) => {
  return await setSignedCookie(c, name, value, COOKIE_SECRET as string, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    domain: process.env.NODE_ENV === "production" ? DOMAIN : undefined,
    httpOnly: true,
    maxAge: maxAgeSeconds,
    expires: new Date(Date.now() + maxAgeSeconds * 1000),
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
};

export const parseFormValue = (key: string, value: any) => {
  if (value === undefined) return undefined;

  try {
    // if boolean string
    if (value === "true") return true;
    if (value === "false") return false;

    // if array/object JSON string
    if (
      (key === "categories" || key === "variants" || key === "tags") &&
      typeof value === "string"
    ) {
      return JSON.parse(value);
    }

    return value;
  } catch (err) {
    return value;
  }
};

export function parseDeleteUrls(
  formData: FormData,
  key = "deleteImageUrl"
): string[] {
  const allValues = formData.getAll(key);

  if (allValues.length === 1) {
    const raw = allValues[0] as string;
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [raw];
    }
  }

  return allValues.map((v) => v as string);
}
