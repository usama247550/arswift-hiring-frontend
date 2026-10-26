"use server";

import { revalidatePath } from "next/cache";

const BASE = (process.env.API_URL || "http://localhost:5000").replace(/\/$/, "");

// Emails the test PDF to a candidate. Runs on the server, so the API key never reaches the browser.
export async function sendTest(previousState, formData) {
  const id = String(formData.get("id") || "");
  if (!/^[a-f0-9]{24}$/i.test(id)) return { error: "Candidate not found." };

  try {
    const res = await fetch(`${BASE}/api/candidates/${id}/send-test`, {
      method: "POST",
      headers: { "x-api-key": process.env.API_KEY || "" },
      cache: "no-store",
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { error: body.error || `The backend answered with status ${res.status}.` };
    }
  } catch {
    return { error: "The backend could not be reached." };
  }

  revalidatePath("/candidates");
  revalidatePath("/");
  return { done: true };
}
