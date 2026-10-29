import Avatar from "@/components/Avatar";
import StatusBadge from "@/components/StatusBadge";
import SendTestButton from "@/components/SendTestButton";
import { formatDate, formatSlot } from "@/lib/format";

export default function CandidateRows({ items }) {
  return (
    <div className="rows">
      <div className="rows-head" aria-hidden="true">
        <span>Candidate</span>
        <span>Role</span>
        <span>City</span>
        <span>Status</span>
        <span>Applied</span>
        <span>Action</span>
      </div>
      <ul>
        {items.map((c) => (
          <li className="row" key={c._id}>
            <div className="c-name">
              <Avatar name={c.name} />
              <div className="c-text">
                <strong>{c.name}</strong>
                <span>{c.email}</span>
              </div>
            </div>
            <div className="c-role">{c.role}</div>
            <div className="c-city">{c.city}</div>
            <div className="c-status">
              <StatusBadge status={c.status} />
              {c.status === "scheduled" && c.interviewAt ? (
                <span className="slot">{formatSlot(c.interviewAt)}</span>
              ) : null}
            </div>
            <div className="c-date">{formatDate(c.createdAt)}</div>
            <div className="c-action">
              {c.status === "scheduled" ? <SendTestButton id={c._id} name={c.name} /> : null}
              {c.status === "arrived" ? <SendTestButton id={c._id} name={c.name} again /> : null}
              {!["scheduled", "arrived"].includes(c.status) ? <span className="c-none">—</span> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
