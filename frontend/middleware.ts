import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Only protect dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("X-User-Phone");
  const phone = cookie?.value.split(".")[0];

  // If no valid phone number in cookie -> redirect to privacy policy page
  if (!phone || !/^\d{11}$/.test(phone)) {
    const policyUrl = new URL("/privacy", request.url);
    policyUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(policyUrl);
  }

  // ✅ Cookie exists → allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // 🔥 only for /dashboard routes
};
