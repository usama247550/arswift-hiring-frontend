// Keep in sync with STATUSES in backend/src/models/Candidate.js
export const STATUS_ORDER = ["new", "scheduled", "rejected", "arrived", "no_show", "passed", "failed", "archived"];

const LABELS = {
  new: "New",
  scheduled: "Interview booked",
  rejected: "Not shortlisted",
  arrived: "Arrived",
  no_show: "Not interested",
  passed: "CEO meeting",
  failed: "Not selected",
  archived: "Archived",
};

export const statusLabel = (status) => LABELS[status] || status;

// Colours used by the chart on the Overview page.
export const STATUS_COLORS = {
  new: "#2f66f0",
  scheduled: "#2fa866",
  rejected: "#ef4565",
  arrived: "#12a4ba",
  no_show: "#f6a82a",
  passed: "#0f9f7e",
  failed: "#8e44ad",
  archived: "#7b8498",
};

// One short line that says what each status means.
export const STATUS_NOTES = {
  new: "Applied, waiting for an interview slot",
  scheduled: "Interview booked, not held yet",
  rejected: "Not in Faisalabad, polite rejection sent",
  arrived: "Came for the interview, test sent, waiting for the decision",
  no_show: "Did not come on the interview day",
  passed: "Passed the test, meeting with the CEO booked",
  failed: "Did not pass the test",
  archived: "Closed and kept for records",
};
