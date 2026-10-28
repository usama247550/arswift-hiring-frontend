"use client";

import { useActionState } from "react";
import { syncAnswers } from "@/app/review/actions";

export default function SyncButton() {
  const [state, action, pending] = useActionState(syncAnswers, null);

  return (
    <form action={action} className="review-bar">
      <button type="submit" className="act" disabled={pending}>
        {pending ? "Checking..." : "Check for new answers"}
      </button>
      {state?.message ? <p className="review-msg">{state.message}</p> : null}
      {state?.error ? (
        <p className="act-error" role="alert">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
