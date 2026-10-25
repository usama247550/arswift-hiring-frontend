import { statusLabel } from "@/lib/status";

export default function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{statusLabel(status)}</span>;
}
