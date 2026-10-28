import { STATUS_ORDER, STATUS_COLORS, STATUS_NOTES, statusLabel } from "@/lib/status";

// Circle chart on one side, the colours and what they mean on the other.
export default function StatusDonut({ byStatus, total }) {
  const rows = STATUS_ORDER.filter((s) => s !== "archived" || byStatus[s] > 0).map((s) => ({
    status: s,
    count: byStatus[s] || 0,
  }));

  // The circle has a length of 100 (radius 15.915), so a share in percent is also its arc length.
  let used = 0;
  const arcs = rows
    .filter((r) => r.count > 0)
    .map((r) => {
      const share = (r.count / total) * 100;
      const arc = { ...r, share, offset: 25 - used };
      used += share;
      return arc;
    });

  return (
    <div className="stand">
      <div className="donut">
        <svg
          viewBox="0 0 42 42"
          role="img"
          aria-label={rows.filter((r) => r.count > 0).map((r) => `${statusLabel(r.status)}: ${r.count}`).join(", ")}
        >
          <circle cx="21" cy="21" r="15.915" fill="none" stroke="#161d33" strokeWidth="5" />
          {arcs.map((a) => (
            <circle
              key={a.status}
              cx="21"
              cy="21"
              r="15.915"
              fill="none"
              stroke={STATUS_COLORS[a.status]}
              strokeWidth="5"
              strokeDasharray={`${Math.max(a.share - 0.6, 0.4)} ${100 - Math.max(a.share - 0.6, 0.4)}`}
              strokeDashoffset={a.offset}
            />
          ))}
        </svg>
        <div className="donut-total">
          <b>{total}</b>
          <span>candidates</span>
        </div>
      </div>

      <ul className="stand-list">
        {rows.map((r) => (
          <li key={r.status}>
            <i className="dot" style={{ background: STATUS_COLORS[r.status] }} />
            <div className="stand-text">
              <span className="stand-name">{statusLabel(r.status)}</span>
              <span className="stand-note">{STATUS_NOTES[r.status]}</span>
            </div>
            <div className="stand-num">
              <b>{r.count}</b>
              <span>{Math.round((r.count / total) * 100)}%</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
