import Link from "next/link";
import { apiGet } from "@/lib/api";
import CandidateRows from "@/components/CandidateRows";
import Notice from "@/components/Notice";

export const dynamic = "force-dynamic";

const FILTERS = [
  { key: "", label: "All" },
  { key: "new", label: "New" },
  { key: "scheduled", label: "Interview booked" },
  { key: "rejected", label: "Not shortlisted" },
];

export default async function CandidatesPage({ searchParams }) {
  const sp = await searchParams;
  const status = typeof sp?.status === "string" ? sp.status : "";
  const q = typeof sp?.q === "string" ? sp.q : "";

  const query = new URLSearchParams({ limit: "200" });
  if (status) query.set("status", status);
  if (q) query.set("q", q);
  const res = await apiGet(`/api/candidates?${query.toString()}`);

  const hrefFor = (key) => {
    const p = new URLSearchParams();
    if (key) p.set("status", key);
    if (q) p.set("q", q);
    const s = p.toString();
    return s ? `/candidates?${s}` : "/candidates";
  };

  const items = res.data?.items ?? [];
  const filtered = Boolean(status || q);

  return (
    <div className="page">
      <header className="page-head">
        <h1>Candidates</h1>
        <p>Search by name, role, city or email.</p>
      </header>

      <form className="search" action="/candidates" method="get">
        {status ? <input type="hidden" name="status" value={status} /> : null}
        <label className="sr-only" htmlFor="q">
          Search candidates
        </label>
        <input id="q" name="q" type="search" defaultValue={q} placeholder="Search candidates" />
        <button type="submit">Search</button>
      </form>

      <nav className="chips" aria-label="Filter by status">
        {FILTERS.map((f) => (
          <Link
            key={f.key || "all"}
            href={hrefFor(f.key)}
            className="chip"
            aria-current={status === f.key ? "true" : undefined}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      {!res.ok ? (
        <Notice title="Candidates could not be loaded">
          Check that the backend is running and that API_URL and API_KEY are set in frontend/.env.local.
        </Notice>
      ) : items.length === 0 ? (
        <div className="empty">
          <strong>{filtered ? "No one matches this search" : "No candidates yet"}</strong>
          <p>
            {filtered ? (
              <>
                Try a different word, or <Link href="/candidates" className="link">clear the filters</Link>.
              </>
            ) : (
              "They show up here as soon as someone submits the application form."
            )}
          </p>
        </div>
      ) : (
        <>
          <p className="count">
            {items.length} {items.length === 1 ? "candidate" : "candidates"}
          </p>
          <CandidateRows items={items} />
        </>
      )}
    </div>
  );
}
