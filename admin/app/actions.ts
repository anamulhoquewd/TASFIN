"use server";

import { cookies } from "next/headers";

export async function createCookie(data: {
  name: "accessToken" | "refreshToken";
  value: string;
  maxAgeAsSeconds: number;
}) {
  const cookieStore = await cookies();

  cookieStore.delete(data.name);
  cookieStore.set({
    name: data.name,
    value: data.value,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
    maxAge: data.maxAgeAsSeconds,
    expires: new Date(Date.now() + data.maxAgeAsSeconds * 1000),
  });
}

export async function getCookie(name: "accessToken" | "refreshToken") {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

export async function deleteCookie(data: {
  name: "accessToken" | "refreshToken";
}) {
  (await cookies()).set(data.name, "", { maxAge: 0 });
}
