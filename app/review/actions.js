"use server";

import { revalidatePath } from "next/cache";

const BASE = (process.env.API_URL || "http://localhost:5000").replace(/\/$/, "");
const ID = /^[a-f0-9]{24}$/i;

async function call(path, options = {}) {
  try {
    const res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { "x-api-key": process.env.API_KEY || "", "Content-Type": "application/json" },
      cache: "no-store",
      ...options,
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { error: body.error || `The backend answered with status ${res.status}.` };
    return { data: body };
  } catch {
    return { error: "The backend could not be reached." };
  }
}

function refresh() {
  revalidatePath("/review");
  revalidatePath("/candidates");
  revalidatePath("/");
}

// Looks in the HR mailbox for new answers.
export async function syncAnswers() {
  const result = await call("/api/review/sync");
  if (result.error) return { error: result.error };
  refresh();
  const { added } = result.data;
  return { message: added > 0 ? `${added} new ${added === 1 ? "answer" : "answers"} found.` : "No new answers." };
}

export async function passCandidate(previousState, formData) {
  const id = String(formData.get("id") || "");
  const meetingAt = String(formData.get("meetingAt") || "");
  if (!ID.test(id)) return { error: "Candidate not found." };
  if (!meetingAt) return { error: "Please choose the meeting date and time." };

  const result = await call(`/api/review/${id}/pass`, { body: JSON.stringify({ meetingAt }) });
  if (result.error) return { error: result.error };
  refresh();
  return { done: true };
}

export async function failCandidate(previousState, formData) {
  const id = String(formData.get("id") || "");
  if (!ID.test(id)) return { error: "Candidate not found." };

  const result = await call(`/api/review/${id}/fail`, { body: "{}" });
  if (result.error) return { error: result.error };
  refresh();
  return { done: true };
}
