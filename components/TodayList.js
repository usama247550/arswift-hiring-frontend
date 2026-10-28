import StatusBadge from "@/components/StatusBadge";
import SendTestButton from "@/components/SendTestButton";
import { formatTime } from "@/lib/format";

export default function TodayList({ items }) {
  if (items.length === 0) {
    return (
      <div className="empty">
        <strong>No interviews today</strong>
        <p>Candidates with a booked slot for today show up here, earliest first.</p>
      </div>
    );
  }

  return (
    <ul className="today">
      {items.map((c) => (
        <li className="today-row" key={c._id}>
          <span className="today-time">{formatTime(c.interviewAt)}</span>
          <div className="today-who">
            <strong>{c.name}</strong>
            <span>{c.role}</span>
          </div>
          <div className="today-status">
            <StatusBadge status={c.status} />
          </div>
          <div className="today-action">
            {c.status === "scheduled" || c.status === "no_show" ? <SendTestButton id={c._id} name={c.name} /> : null}
            {c.status === "arrived" ? <SendTestButton id={c._id} name={c.name} again /> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
