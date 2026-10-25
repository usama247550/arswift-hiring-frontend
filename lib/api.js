const BASE = (process.env.API_URL || "http://localhost:5000").replace(/\/$/, "");

// Server-side only: the API key stays on the Next.js server.
export async function apiGet(path) {
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { "x-api-key": process.env.API_KEY || "" },
      cache: "no-store",
    });
    if (!res.ok) return { ok: false, error: `The backend answered with status ${res.status}.` };
    return { ok: true, data: await res.json() };
  } catch {
    return { ok: false, error: "The backend could not be reached." };
  }
}
