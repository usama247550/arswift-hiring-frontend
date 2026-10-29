const TONES = [
  ["#e3ecff", "#2a4db5"],
  ["#e8e4fb", "#4b3aa8"],
  ["#dff4ea", "#1f7a4d"],
  ["#fdebd3", "#9a5a0b"],
  ["#fde1e6", "#b1304a"],
  ["#dcf1f5", "#13707f"],
];

function initials(name) {
  const parts = String(name || "?").trim().split(/\s+/).filter(Boolean);
  const two = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0] || "?").slice(0, 2);
  return two.toUpperCase();
}

// Round badge with the candidate's initials. The colour depends on the name, so it stays the same.
export default function Avatar({ name }) {
  let sum = 0;
  for (const ch of String(name || "")) sum += ch.charCodeAt(0);
  const [bg, fg] = TONES[sum % TONES.length];
  return (
    <span className="avatar" style={{ background: bg, color: fg }} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
