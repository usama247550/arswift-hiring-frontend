import Link from "next/link";
import { apiGet } from "@/lib/api";
import { STATUS_ORDER, statusLabel } from "@/lib/status";
import CandidateRows from "@/components/CandidateRows";
import TodayList from "@/components/TodayList";
import Notice from "@/components/Notice";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const [statsRes, listRes, todayRes] = await Promise.all([
    apiGet("/api/candidates/stats"),
    apiGet("/api/candidates?limit=6"),
    apiGet("/api/candidates/today"),
  ]);

  const failed = !statsRes.ok || !listRes.ok;
  const stats = statsRes.data;
  const latest = listRes.data?.items ?? [];
  const present = failed ? [] : STATUS_ORDER.filter((s) => stats.byStatus[s] > 0);

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
            <div>
              <dt>Applied</dt>
              <dd>{stats.total}</dd>
            </div>
            <div>
              <dt>In Faisalabad</dt>
              <dd>{stats.faisalabad}</dd>
            </div>
            <div>
              <dt>Interview booked</dt>
              <dd>{stats.byStatus.scheduled}</dd>
            </div>
            <div>
              <dt>Not shortlisted</dt>
              <dd>{stats.byStatus.rejected}</dd>
            </div>
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
              <>
                <div
                  className="bar"
                  role="img"
                  aria-label={present.map((s) => `${statusLabel(s)}: ${stats.byStatus[s]}`).join(", ")}
                >
                  {present.map((s) => (
                    <span key={s} className={`bar-seg seg-${s}`} style={{ flexGrow: stats.byStatus[s] }} />
                  ))}
                </div>
                <ul className="legend">
                  {present.map((s) => (
                    <li key={s}>
                      <i className={`dot seg-${s}`} />
                      {statusLabel(s)} <b>{stats.byStatus[s]}</b>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <section className="block" aria-labelledby="latest-h">
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
              <CandidateRows items={latest} />
            )}
          </section>
        </>
      )}
    </div>
  );
}
