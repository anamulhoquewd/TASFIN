import type { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { config } from "dotenv";
import { authenticationError, authorizationError } from "./../error/index.js";
import Admin from "./../models/admins.model.js";
import User from "./../models/users.model.js";
import { deleteCookie, getSignedCookie } from "hono/cookie";
config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const DOMAIN_NAME = process.env.DOMAIN_NAME as string;

export const authenticatedAnyUser = async (c: Context, next: Next) => {
  const phone = c.req.header("X-User-ID");
  const token = c.req.header("Authorization")?.replace("Bearer ", "");

  try {
    // যদি phone থাকে → normal user
    if (phone) {
      const user = await User.findOne({ phone });
      if (!user || user.isBlocked) {
        return authenticationError(c);
      }
      c.set("user", user);
      return next();
    }

    // যদি token থাকে → admin / super_admin
    if (token) {
      const decoded = await verify(token, JWT_ACCESS_SECRET);
      if (!decoded || typeof decoded !== "object" || !("_id" in decoded)) {
        return authenticationError(c);
      }

      const admin = await Admin.findById(decoded._id);
      if (!admin) {
        return authenticationError(c);
      }

      c.set("admin", admin);
      return next();
    }

    // যদি phone বা token দুটিই না থাকে → unauthorized
    return authenticationError(c);
  } catch (error) {
    console.log("Authentication error:", error);
    return authenticationError(c);
  }
};

//  Check if user is authenticated
export const authenticatedUser = async (c: Context, next: Next) => {
  const phone = c.req.header("X-User-ID");
  try {
    const user = await User.findOne({ phone });

    if (!user || user.isBlocked) {
      // deleteCookie(c, "X-User-ID", {
      //   path: "/",
      //   secure: process.env.NODE_ENV === "production",
      //   domain: process.env.NODE_ENV === "production" ? DOMAIN_NAME : undefined,
      // });

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
  const token = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    // Clear cookie using Hono's deleteCookie
    // deleteCookie(c, "accessToken", {
    //   path: "/",
    //   secure: process.env.NODE_ENV === "production",
    //   domain: process.env.NODE_ENV === "production" ? DOMAIN_NAME : undefined,
    // });

    return authenticationError(c);
  }

  try {
    const decoded = await verify(token, JWT_ACCESS_SECRET);
    if (!decoded || typeof decoded !== "object" || !decoded._id) {
      return authenticationError(c);
    }

    const admin = await Admin.findById(decoded._id);

    if (!admin) {
      // // Clear cookie using Hono's deleteCookie
      // deleteCookie(c, "accessToken", {
      //   path: "/",
      //   secure: process.env.NODE_ENV === "production",
      //   domain: process.env.NODE_ENV === "production" ? DOMAIN_NAME : undefined,
      // });
      // deleteCookie(c, "refreshToken", {
      //   path: "/",
      //   secure: process.env.NODE_ENV === "production",
      //   domain: process.env.NODE_ENV === "production" ? DOMAIN_NAME : undefined,
      // });

      return authenticationError(c);
    }

    c.set("admin", admin);
    return next();
  } catch (error) {
    console.log("error", error);
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
