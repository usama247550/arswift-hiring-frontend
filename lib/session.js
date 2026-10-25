// Signed login cookie. Uses Web Crypto so it runs in the middleware (Edge) and in Node.
const encoder = new TextEncoder();

export const COOKIE_NAME = "arswift_session";
export const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // stay logged in for 7 days

function toHex(bytes) {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return toHex(new Uint8Array(signature));
}

function sameText(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// The cookie holds "<expiry time>.<signature>". Nobody can change the expiry without the secret.
export async function createSession(secret, now = Date.now()) {
  const expires = String(now + MAX_AGE_SECONDS * 1000);
  return `${expires}.${await sign(expires, secret)}`;
}

export async function verifySession(token, secret, now = Date.now()) {
  if (!token || !secret) return false;
  const [expires, signature] = String(token).split(".");
  if (!expires || !signature) return false;
  if (!sameText(signature, await sign(expires, secret))) return false;
  return Number(expires) > now;
}
