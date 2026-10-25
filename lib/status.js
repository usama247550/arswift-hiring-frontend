// Keep in sync with STATUSES in backend/src/models/Candidate.js
export const STATUS_ORDER = ["new", "scheduled", "rejected", "arrived", "no_show", "archived"];

const LABELS = {
  new: "New",
  scheduled: "Interview booked",
  rejected: "Not shortlisted",
  arrived: "Arrived",
  no_show: "No show",
  archived: "Archived",
};

export const statusLabel = (status) => LABELS[status] || status;
