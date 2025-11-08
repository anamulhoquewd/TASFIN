import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Only protect dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("X-User-ID");
  const userId = cookie?.value;

  // If no valid userId number in cookie -> redirect to privacy policy page
  if (!userId) {
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
