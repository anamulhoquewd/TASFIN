"use server";

import { cookies } from "next/headers";

export async function createCookie(data: {
  name: "X-User-ID";
  value: string;
  maxAgeAsSeconds: number;
}) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: data.name,
    value: data.value,
    httpOnly: true,
    path: "/",
    ...(process.env.COOKIE_DOMAIN
      ? { domain: process.env.COOKIE_DOMAIN }
      : {}),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: data.maxAgeAsSeconds,
    expires: new Date(Date.now() + data.maxAgeAsSeconds * 1000),
  });
}

export async function getCookie(name: "X-User-ID") {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

export async function deleteCookie(name: "X-User-ID") {
  const cookieStore = await cookies();
  cookieStore.set(name, "", {
    domain: process.env.COOKIE_DOMAIN || undefined,
    path: "/",
    maxAge: 0,
  });
}
