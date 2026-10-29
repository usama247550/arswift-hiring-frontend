import Link from "next/link";
import { apiGet } from "@/lib/api";
import CandidateRows from "@/components/CandidateRows";
import Pagination from "@/components/Pagination";
import StatusDonut from "@/components/StatusDonut";
import TodayList from "@/components/TodayList";
import Notice from "@/components/Notice";
import {
  InboxIcon,
  PinIcon,
  BanIcon,
  CalendarIcon,
  UserCheckIcon,
  UserMinusIcon,
  BriefcaseIcon,
  CrossIcon,
  ChartIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  UsersIcon,
} from "@/components/Icons";
import { STATUS_COLORS } from "@/lib/status";

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
        ["Applied", stats.total, InboxIcon, "#2f66f0", ""],
        ["In Faisalabad", stats.faisalabad, PinIcon, "#2fa866", ""],
        ["Not shortlisted", by.rejected ?? 0, BanIcon, STATUS_COLORS.rejected, "rejected"],
        ["Interview booked", by.scheduled ?? 0, CalendarIcon, STATUS_COLORS.scheduled, "scheduled"],
        ["Arrived", by.arrived ?? 0, UserCheckIcon, STATUS_COLORS.arrived, "arrived"],
        ["Not interested", by.no_show ?? 0, UserMinusIcon, STATUS_COLORS.no_show, "no_show"],
        ["CEO meeting", by.passed ?? 0, BriefcaseIcon, STATUS_COLORS.passed, "passed"],
        ["Not selected", by.failed ?? 0, CrossIcon, STATUS_COLORS.failed, "failed"],
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
            {boxes.map(([label, value, Icon, color, key], i) => (
              <div key={label} style={{ "--i": i, "--tint": color }}>
                <Link href={key ? `/candidates?status=${key}` : "/candidates"} className="fig-link" aria-label={`${label}: ${value}`}>
                  <span className="fig-icon">
                    <Icon />
                  </span>
                  <span className="fig-text">
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </span>
                  <ChevronRightIcon className="fig-go" width={16} height={16} />
                </Link>
              </div>
            ))}
          </dl>

          <section className="block" aria-labelledby="today-h">
            <div className="block-head">
              <h2 id="today-h">
                <CalendarIcon className="h-ico" /> Today&apos;s interviews
              </h2>
              <Link href="/candidates?status=scheduled" className="link">
                View all <ArrowRightIcon width={15} height={15} />
              </Link>
            </div>
            {!todayRes.ok ? (
              <p className="muted">Today&apos;s interviews could not be loaded.</p>
            ) : (
              <TodayList items={todayRes.data?.items ?? []} />
            )}
          </section>

          <section className="block" aria-labelledby="stand-h">
            <div className="block-head">
              <h2 id="stand-h">
                <ChartIcon className="h-ico" /> Where candidates stand
              </h2>
            </div>
            {stats.total === 0 ? (
              <p className="muted">Nobody has applied yet.</p>
            ) : (
              <StatusDonut byStatus={by} total={stats.total} />
            )}
          </section>

          <section className="block" id="latest" aria-labelledby="latest-h">
            <div className="block-head">
              <h2 id="latest-h">
                <UsersIcon className="h-ico" /> Latest applications
              </h2>
              <Link href="/candidates" className="link">
                See all candidates <ArrowRightIcon width={15} height={15} />
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
