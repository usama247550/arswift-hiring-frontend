const TZ = "Asia/Karachi";

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: TZ });
const slotFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: TZ,
});

export const formatDate = (value) => (value ? dateFmt.format(new Date(value)) : "");
export const formatSlot = (value) => (value ? slotFmt.format(new Date(value)) : "");
