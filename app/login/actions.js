"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, timingSafeEqual } from "crypto";
import { COOKIE_NAME, MAX_AGE_SECONDS, createSession } from "@/lib/session";

const digest = (value) => createHash("sha256").update(String(value)).digest();

export async function login(previousState, formData) {
  const expected = process.env.DASHBOARD_PASSWORD;
  const secret = process.env.SESSION_SECRET;
  if (!expected || !secret) {
    return { error: "Login is not set up on the server yet." };
  }

  const given = String(formData.get("password") || "");
  if (!timingSafeEqual(digest(given), digest(expected))) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // slows down guessing
    return { error: "That password is not correct." };
  }

  const store = await cookies();
  store.set(COOKIE_NAME, await createSession(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
  redirect("/");
}

export async function logout() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  redirect("/login");
}
