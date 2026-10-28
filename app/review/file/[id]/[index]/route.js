const BASE = (process.env.API_URL || "http://localhost:5000").replace(/\/$/, "");

// Pictures and PDFs open in the browser. Anything else is downloaded, never run.
const INLINE_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/webp", "image/gif"];

// Opens one answer file. The login check in middleware.js covers this path too.
export async function GET(request, { params }) {
  const { id, index } = await params;
  if (!/^[a-f0-9]{24}$/i.test(id) || !/^\d{1,2}$/.test(index)) {
    return new Response("Not found", { status: 404 });
  }

  let res;
  try {
    res = await fetch(`${BASE}/api/review/files/${id}/${index}`, {
      headers: { "x-api-key": process.env.API_KEY || "" },
      cache: "no-store",
    });
  } catch {
    return new Response("The backend could not be reached.", { status: 502 });
  }
  if (!res.ok) return new Response("File not found", { status: res.status === 404 ? 404 : 502 });

  const type = (res.headers.get("content-type") || "application/octet-stream").split(";")[0].trim().toLowerCase();
  const disposition = (res.headers.get("content-disposition") || 'inline; filename="file"').replace(
    /^inline/i,
    INLINE_TYPES.includes(type) ? "inline" : "attachment"
  );

  return new Response(res.body, {
    headers: {
      "Content-Type": INLINE_TYPES.includes(type) ? type : "application/octet-stream",
      "Content-Disposition": disposition,
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "sandbox",
      "Cache-Control": "private, no-store",
    },
  });
}
