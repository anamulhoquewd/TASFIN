import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { sign } from "hono/jwt";
import dotenv from "dotenv";
import { Context } from "hono";
import { setSignedCookie } from "hono/cookie";
import { IAdmin, IUser } from "@/interfaces";
dotenv.config();

const JWT_REFRESH_SECRET =
  (process.env.JWT_REFRESH_SECRET as string) || "JWT_REFRESH_SECRET";
const JWT_ACCESS_SECRET =
  (process.env.JWT_ACCESS_SECRET as string) || "JWT_ACCESS_SECRET";

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

    // await s3.send(command);
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
      // exp: Math.floor(Date.now() / 1000) + 60 * 120,
    },
    JWT_ACCESS_SECRET as string
  );

  if (!token) {
    throw new Error("Token generated failed");
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
  await setSignedCookie(c, name, value, process.env.COOKIE_SECRET as string, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    domain: process.env.NODE_ENV === "production" ? "tasfin.com" : undefined,
    httpOnly: true,
    maxAge: maxAgeSeconds,
    expires: new Date(Date.now() + maxAgeSeconds * 1000),
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
};
