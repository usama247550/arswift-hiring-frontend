"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/login/actions";

const svgProps = {
  viewBox: "0 0 20 20",
  width: 20,
  height: 20,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  className: "nav-ico",
};

const items = [
  {
    href: "/",
    label: "Overview",
    icon: (
      <svg {...svgProps}>
        <rect x="3" y="3" width="6" height="6" rx="1.4" />
        <rect x="11" y="3" width="6" height="6" rx="1.4" />
        <rect x="3" y="11" width="6" height="6" rx="1.4" />
        <rect x="11" y="11" width="6" height="6" rx="1.4" />
      </svg>
    ),
  },
  {
    href: "/candidates",
    label: "Candidates",
    icon: (
      <svg {...svgProps}>
        <circle cx="7.5" cy="7" r="2.8" />
        <path d="M2.5 16.5c0-3 2.3-4.8 5-4.8s5 1.8 5 4.8" />
        <path d="M13 4.4a2.8 2.8 0 0 1 0 5.2" />
        <path d="M14.6 12c1.7.5 2.9 2 2.9 4.5" />
      </svg>
    ),
  },
  {
    href: "/review",
    label: "Review",
    icon: (
      <svg {...svgProps}>
        <path d="M6 3.5h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1z" />
        <path d="M8 3.5V2.7h4v.8" />
        <path d="M7.6 10.4l1.8 1.8 3.2-3.4" />
      </svg>
    ),
  },
];

export default function Nav({ collapsed, open, onToggleCollapsed, onClose }) {
  const pathname = usePathname();

  return (
    <nav id="site-nav" className={`nav${open ? " is-open" : ""}`} aria-label="Main">
      <div className="nav-head">
        <span className="brand-mark" aria-hidden="true">
          AS
        </span>
        <div className="brand">
          <span className="brand-name">AR Swift</span>
          <span className="brand-sub">Hiring</span>
        </div>
        <button type="button" className="nav-close" aria-label="Close menu" onClick={onClose}>
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
      </div>

      <ul className="nav-list">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="nav-link"
                aria-current={active ? "page" : undefined}
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="nav-bottom">
        <button
          type="button"
          className="nav-link collapse-btn"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Expand menu" : "Collapse menu"}
          title={collapsed ? "Expand menu" : undefined}
        >
          <svg {...svgProps} className="nav-ico collapse-ico">
            <path d="M11.5 5L6.5 10l5 5" />
            <path d="M15.5 4v12" />
          </svg>
          <span className="nav-label">Collapse</span>
        </button>

        <form action={logout}>
          <button type="submit" className="nav-link" title={collapsed ? "Log out" : undefined}>
            <svg {...svgProps}>
              <path d="M8 3H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h3" />
              <path d="M13 6l4 4-4 4" />
              <path d="M17 10H8" />
            </svg>
            <span className="nav-label">Log out</span>
          </button>
        </form>
      </div>
    </nav>
  );
}
