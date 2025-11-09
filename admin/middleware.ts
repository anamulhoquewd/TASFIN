import { NextRequest, NextResponse } from "next/server";
import { decodeJwtPayload } from "./lib/utils";
import { deleteCookie } from "./app/actions";

const PUBLIC_AUTH_ROUTES = [
  "/auth/sign-in",
  "/auth/forgot-password",
  "/auth/reset-password",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get("refreshToken");
  const token = cookie?.value;

  // redirect root "/" -> "/admin"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Allow unauthenticated access to auth routes
  if (PUBLIC_AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (token) {
      const decoded = decodeJwtPayload(token as string);
      if (!decoded) {
        deleteCookie({ name: "accessToken" });
        deleteCookie({ name: "refreshToken" });
        return redirectToLogin(request);
      }
      if (decoded.exp < Date.now() / 1000) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return redirectToLogin(request);
  }

  const decoded = decodeJwtPayload(token);
  if (!decoded || decoded.exp < Date.now() / 1000) {
    deleteCookie({ name: "accessToken" });
    deleteCookie({ name: "refreshToken" });
    return redirectToLogin(request);
  }

  if (decoded.role !== "super_admin" && pathname === "/dashboard/users") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/auth/sign-in", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
    "/((?!_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)",
  ],
};
