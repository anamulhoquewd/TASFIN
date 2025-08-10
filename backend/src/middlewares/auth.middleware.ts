import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { config } from "dotenv";
import { authenticationError, authorizationError } from "@/error";
import Admin from "@/models/admins.model";
import User from "@/models/users.model";
import { getSignedCookie } from "hono/cookie";
config();

const JWT_ACCESS_SECRET =
  (process.env.JWT_ACCESS_SECRET as string) || "JWT_ACCESS_SECRET";

//  Check if user is authenticated
export const authenticatedUser = async (c: Context, next: Next) => {
  const token =
    c.req.header("Authorization")?.replace("Bearer ", "") ||
    (await getSignedCookie(
      c,
      process.env.COOKIE_SECRET as string,
      "accessToken"
    ));

  if (!token) {
    return authenticationError(c);
  }

  try {
    const decoded = await verify(token, JWT_ACCESS_SECRET);
    if (!decoded || typeof decoded !== "object" || !decoded._id) {
      return authenticationError(c);
    }

    const user = await User.findById(decoded._id);

    if (!user || user.isBlocked) {
      return authenticationError(c);
    }

    c.set("user", user);
    return next();
  } catch (error) {
    return authenticationError(c);
  }
};

//  Check if admin is authenticated
export const authenticatedAdmin = async (c: Context, next: Next) => {
  const token =
    c.req.header("Authorization")?.replace("Bearer ", "") ||
    (await getSignedCookie(
      c,
      process.env.COOKIE_SECRET as string,
      "accessToken"
    ));

  if (!token) {
    return authenticationError(c);
  }

  try {
    const decoded = await verify(token, JWT_ACCESS_SECRET);
    if (!decoded || typeof decoded !== "object" || !decoded._id) {
      return authenticationError(c);
    }

    const admin = await Admin.findById(decoded._id);

    if (!admin) {
      return authenticationError(c);
    }

    c.set("admin", admin);
    return next();
  } catch (error) {
    console.log(error);
    return authenticationError(c);
  }
};

// Check if this admin is admin or not
export const authorize = async (c: Context, next: Next) => {
  const admin = c.get("admin");
  if (!admin) {
    return authenticationError(c);
  }

  if (admin.role === "super_admin") {
    return next();
  }

  return authorizationError(c);
};
