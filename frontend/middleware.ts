import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get("X-User-Phone");
  const phone = cookie?.value;

  // redirect root "/" -> "/admin"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Allow unauthenticated access to auth routes
  if (PUBLIC_AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (phone) {
      const decoded = decodeJwtPayload(phone as string);
      if (!decoded) {
        return redirectToLogin(request);
      }
      if (decoded.exp < Date.now() / 1000) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!phone) {
    return redirectToLogin(request);
  }

  const decoded = decodeJwtPayload(phone);
  if (!decoded || decoded.exp < Date.now() / 1000) {
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
