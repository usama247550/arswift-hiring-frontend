// Small line icons. They take their colour from the text colour around them.
const base = {
  viewBox: "0 0 20 20",
  width: 20,
  height: 20,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

const make = (children) =>
  function Icon(props) {
    return (
      <svg {...base} {...props}>
        {children}
      </svg>
    );
  };

export const GridIcon = make(
  <>
    <rect x="3" y="3" width="6" height="6" rx="1.4" />
    <rect x="11" y="3" width="6" height="6" rx="1.4" />
    <rect x="3" y="11" width="6" height="6" rx="1.4" />
    <rect x="11" y="11" width="6" height="6" rx="1.4" />
  </>
);

export const UsersIcon = make(
  <>
    <circle cx="8" cy="7" r="3" />
    <path d="M2.5 16.5c0-3 2.5-4.8 5.5-4.8s5.5 1.8 5.5 4.8" />
    <path d="M13.5 4.4a2.8 2.8 0 0 1 0 5.2" />
    <path d="M15 12.2c1.6.6 2.6 2 2.6 4.3" />
  </>
);

export const ReviewIcon = make(
  <>
    <path d="M5 2.8h6.5L15 6.3v10.9H5z" />
    <path d="M11.5 2.8v3.5H15" />
    <path d="M7.6 11.2l1.7 1.7 3.1-3.3" />
  </>
);

export const LogoutIcon = make(
  <>
    <path d="M8 3H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h3" />
    <path d="M13 6l4 4-4 4" />
    <path d="M17 10H8" />
  </>
);

export const MenuIcon = make(
  <>
    <path d="M3 5.5h14" />
    <path d="M3 10h14" />
    <path d="M3 14.5h14" />
  </>
);

export const CloseIcon = make(
  <>
    <path d="M5 5l10 10" />
    <path d="M15 5L5 15" />
  </>
);

export const CollapseIcon = make(
  <>
    <rect x="2.8" y="3.5" width="14.4" height="13" rx="2.2" />
    <path d="M7.5 3.5v13" />
    <path d="M12.8 8l-2 2 2 2" />
  </>
);

export const InboxIcon = make(
  <>
    <path d="M3 11l2-6.5h10L17 11" />
    <path d="M3 11v4.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V11h-4.2a2.8 2.8 0 0 1-5.6 0z" />
  </>
);

export const PinIcon = make(
  <>
    <path d="M10 17.5s5.5-4.7 5.5-9A5.5 5.5 0 0 0 4.5 8.5c0 4.3 5.5 9 5.5 9z" />
    <circle cx="10" cy="8.5" r="2" />
  </>
);

export const BanIcon = make(
  <>
    <circle cx="10" cy="10" r="7" />
    <path d="M5.2 5.2l9.6 9.6" />
  </>
);

export const CalendarIcon = make(
  <>
    <rect x="3" y="4.5" width="14" height="12.5" rx="2" />
    <path d="M3 8.5h14" />
    <path d="M7 2.8v3" />
    <path d="M13 2.8v3" />
  </>
);

export const UserCheckIcon = make(
  <>
    <circle cx="8" cy="7" r="3" />
    <path d="M2.5 16.5c0-3 2.5-4.8 5.5-4.8 1.4 0 2.6.4 3.6 1.1" />
    <path d="M12.5 15l1.8 1.8 3.2-3.6" />
  </>
);

export const UserMinusIcon = make(
  <>
    <circle cx="8" cy="7" r="3" />
    <path d="M2.5 16.5c0-3 2.5-4.8 5.5-4.8 1.4 0 2.6.4 3.6 1.1" />
    <path d="M12.8 15h4.4" />
  </>
);

export const BriefcaseIcon = make(
  <>
    <rect x="3" y="6.5" width="14" height="10" rx="2" />
    <path d="M7.5 6.5v-1.2a1.3 1.3 0 0 1 1.3-1.3h2.4a1.3 1.3 0 0 1 1.3 1.3v1.2" />
    <path d="M3 11h14" />
  </>
);

export const CrossIcon = make(
  <>
    <circle cx="10" cy="10" r="7" />
    <path d="M7.4 7.4l5.2 5.2" />
    <path d="M12.6 7.4l-5.2 5.2" />
  </>
);

export const ChartIcon = make(
  <>
    <path d="M4 16.5V9" />
    <path d="M10 16.5V3.5" />
    <path d="M16 16.5v-5.5" />
  </>
);

export const SendIcon = make(
  <>
    <path d="M17 3L9 11" />
    <path d="M17 3l-5.2 14-2.8-6.2L2.8 8z" />
  </>
);

export const ChevronRightIcon = make(<path d="M8 4.5L13.5 10 8 15.5" />);

export const ArrowRightIcon = make(
  <>
    <path d="M4 10h12" />
    <path d="M11.5 5.5L16 10l-4.5 4.5" />
  </>
);

export const BellIcon = make(
  <>
    <path d="M5 8a5 5 0 0 1 10 0c0 4.2 1.5 5.2 1.5 5.2h-13S5 12.2 5 8z" />
    <path d="M8.4 16.2a1.8 1.8 0 0 0 3.2 0" />
  </>
);

export const ChevronDownIcon = make(<path d="M5 8l5 5 5-5" />);
