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
  new: "#4a6fd6",
  scheduled: "#4f9d7a",
  rejected: "#b85a64",
  arrived: "#39a3b7",
  no_show: "#c79a4a",
  passed: "#6aa96a",
  failed: "#8a5a8f",
  archived: "#4b5368",
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
