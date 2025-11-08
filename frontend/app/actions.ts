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
    secure: true,
    sameSite: "none",
    maxAge: data.maxAgeAsSeconds,
    expires: new Date(Date.now() + data.maxAgeAsSeconds * 1000),
  });
}

export async function getCookie(name: "X-User-ID") {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

export async function deleteCookie(data: { name: string; value: string }) {
  (await cookies()).set(data.name, data.value, { maxAge: 0 });
}
