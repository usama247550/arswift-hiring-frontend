import { apiGet } from "@/lib/api";
import ReviewCard from "@/components/ReviewCard";
import SyncButton from "@/components/SyncButton";
import Notice from "@/components/Notice";

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  const res = await apiGet("/api/review");
  const items = res.data?.items ?? [];

  return (
    <div className="page">
      <header className="page-head">
        <h1>Review</h1>
        <p>Answers sent back by candidates. Open them here, then pass or fail.</p>
      </header>

      <SyncButton />

      {!res.ok ? (
        <Notice title="Review could not be loaded">
          Check that the backend is running and that API_URL and API_KEY are set correctly.
        </Notice>
      ) : items.length === 0 ? (
        <div className="empty">
          <strong>Nobody is waiting for a decision</strong>
          <p>Candidates show up here after you press &quot;Send test&quot; for them.</p>
        </div>
      ) : (
        <ul className="review-list">
          {items.map((c) => (
            <ReviewCard key={c._id} candidate={c} />
          ))}
        </ul>
      )}
    </div>
  );
}
