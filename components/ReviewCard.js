"use client";

import { useActionState, useState } from "react";
import { passCandidate, failCandidate } from "@/app/review/actions";
import { formatSlot } from "@/lib/format";

const kb = (bytes) => `${Math.max(1, Math.round(bytes / 1024))} KB`;

export default function ReviewCard({ candidate }) {
  const [passState, passAction, passPending] = useActionState(passCandidate, null);
  const [failState, failAction, failPending] = useActionState(failCandidate, null);
  const [choosing, setChoosing] = useState(false);
  const busy = passPending || failPending;
  const error = passState?.error || failState?.error;

  return (
    <li className="rcard">
      <div className="rcard-head">
        <div>
          <strong>{candidate.name}</strong>
          <span>
            {candidate.role} &middot; {candidate.email}
          </span>
        </div>
        <span>Test sent {formatSlot(candidate.testSentAt)}</span>
      </div>

      <div className="answers">
        {candidate.submissions.length === 0 ? (
          <p className="muted">No answers yet. Use &quot;Check for new answers&quot; after the candidate replies.</p>
        ) : (
          candidate.submissions.map((s) => (
            <div className="answer" key={s._id}>
              <span className="answer-when">Received {formatSlot(s.receivedAt)}</span>
              {s.files.length > 0 ? (
                <div className="answer-files">
                  {s.files.map((f) => (
                    <a
                      key={f.index}
                      className="file-link"
                      href={`/review/file/${s._id}/${f.index}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {f.filename} ({kb(f.size)})
                    </a>
                  ))}
                </div>
              ) : (
                <p className="answer-note">The email had no attachment.</p>
              )}
              {s.skipped.length > 0 ? (
                <p className="answer-note">Too big to keep here, open it in the mailbox: {s.skipped.join(", ")}</p>
              ) : null}
              {s.snippet ? <p className="answer-note">&ldquo;{s.snippet}&rdquo;</p> : null}
            </div>
          ))
        )}
      </div>

      <div className="decide">
        <form
          action={failAction}
          onSubmit={(event) => {
            if (!window.confirm(`Mark ${candidate.name} as not selected? No email is sent.`)) event.preventDefault();
          }}
        >
          <input type="hidden" name="id" value={candidate._id} />
          <button type="submit" className="act act-quiet" disabled={busy}>
            {failPending ? "Saving..." : "Fail"}
          </button>
        </form>

        {!choosing ? (
          <button type="button" className="act act-pass" onClick={() => setChoosing(true)} disabled={busy}>
            Pass
          </button>
        ) : (
          <form
            action={passAction}
            onSubmit={(event) => {
              if (!window.confirm(`Pass ${candidate.name} and email the CEO meeting time?`)) event.preventDefault();
            }}
          >
            <input type="hidden" name="id" value={candidate._id} />
            <label htmlFor={`meet-${candidate._id}`}>CEO meeting</label>
            <input id={`meet-${candidate._id}`} type="datetime-local" name="meetingAt" required />
            <button type="submit" className="act act-pass" disabled={busy}>
              {passPending ? "Sending..." : "Pass and send email"}
            </button>
            <button type="button" className="act act-quiet" onClick={() => setChoosing(false)} disabled={busy}>
              Cancel
            </button>
          </form>
        )}

        {error ? (
          <p className="decide-error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </li>
  );
}
