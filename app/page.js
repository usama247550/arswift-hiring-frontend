import Link from "next/link";
import { apiGet } from "@/lib/api";
import CandidateRows from "@/components/CandidateRows";
import Pagination from "@/components/Pagination";
import StatusDonut from "@/components/StatusDonut";
import TodayList from "@/components/TodayList";
import Notice from "@/components/Notice";

export const dynamic = "force-dynamic";

const PER_PAGE = 15;

export default async function OverviewPage({ searchParams }) {
  const sp = await searchParams;
  const asked = parseInt(typeof sp?.page === "string" ? sp.page : "1", 10);
  const page = Number.isFinite(asked) && asked > 0 ? asked : 1;

  const [statsRes, listRes, todayRes] = await Promise.all([
    apiGet("/api/candidates/stats"),
    apiGet(`/api/candidates?limit=${PER_PAGE}&page=${page}`),
    apiGet("/api/candidates/today"),
  ]);

  const failed = !statsRes.ok || !listRes.ok;
  const stats = statsRes.data;
  const latest = listRes.data?.items ?? [];
  const pages = listRes.data?.pages ?? 1;
  const by = stats?.byStatus ?? {};

  const boxes = failed
    ? []
    : [
        ["Applied", stats.total],
        ["In Faisalabad", stats.faisalabad],
        ["Not shortlisted", by.rejected ?? 0],
        ["Interview booked", by.scheduled ?? 0],
        ["Arrived", by.arrived ?? 0],
        ["Not interested", by.no_show ?? 0],
        ["CEO meeting", by.passed ?? 0],
        ["Not selected", by.failed ?? 0],
      ];

  const hrefFor = (n) => (n === 1 ? "/#latest" : `/?page=${n}#latest`);

  return (
    <div className="page">
      <header className="page-head">
        <h1>Overview</h1>
        <p>Everyone who applied through Indeed, and where they stand.</p>
      </header>

      {failed ? (
        <Notice title="Candidates could not be loaded">
          Check that the backend is running and that API_URL and API_KEY are set in frontend/.env.local.
        </Notice>
      ) : (
        <>
          <dl className="figures">
            {boxes.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <section className="block" aria-labelledby="today-h">
            <h2 id="today-h">Today&apos;s interviews</h2>
            {!todayRes.ok ? (
              <p className="muted">Today&apos;s interviews could not be loaded.</p>
            ) : (
              <TodayList items={todayRes.data?.items ?? []} />
            )}
          </section>

          <section className="block" aria-labelledby="stand-h">
            <h2 id="stand-h">Where candidates stand</h2>
            {stats.total === 0 ? (
              <p className="muted">Nobody has applied yet.</p>
            ) : (
              <StatusDonut byStatus={by} total={stats.total} />
            )}
          </section>

          <section className="block" id="latest" aria-labelledby="latest-h">
            <div className="block-head">
              <h2 id="latest-h">Latest applications</h2>
              <Link href="/candidates" className="link">
                See all candidates
              </Link>
            </div>
            {latest.length === 0 ? (
              <div className="empty">
                <strong>No candidates yet</strong>
                <p>They show up here as soon as someone submits the application form.</p>
              </div>
            ) : (
              <>
                <CandidateRows items={latest} />
                <Pagination page={Math.min(page, pages)} pages={pages} hrefFor={hrefFor} />
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}
