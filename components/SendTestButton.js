"use client";

import { useActionState } from "react";
import { sendTest } from "@/app/candidates/actions";
import { SendIcon } from "@/components/Icons";

export default function SendTestButton({ id, name, again }) {
  const [state, action, pending] = useActionState(sendTest, null);

  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(`Send the test PDF to ${name}?`)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className={again ? "act act-quiet" : "act"} disabled={pending}>
        {pending ? null : <SendIcon width={15} height={15} />}
        {pending ? "Sending..." : again ? "Send again" : "Send test"}
      </button>
      {state?.error ? (
        <p className="act-error" role="alert">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
