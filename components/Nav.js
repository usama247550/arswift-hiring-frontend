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
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const items = [
  {
    href: "/",
    label: "Overview",
    icon: (
      <svg {...svgProps}>
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="11" y="3" width="6" height="6" rx="1" />
        <rect x="3" y="11" width="6" height="6" rx="1" />
        <rect x="11" y="11" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    href: "/candidates",
    label: "Candidates",
    icon: (
      <svg {...svgProps}>
        <circle cx="10" cy="7" r="3" />
        <path d="M4 17c0-3.3 2.7-5 6-5s6 1.7 6 5" />
      </svg>
    ),
  },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav" aria-label="Main">
      <div className="brand">
        <span className="brand-name">AR Swift</span>
        <span className="brand-sub">Hiring</span>
      </div>
      <ul className="nav-list">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link href={item.href} className="nav-link" aria-current={active ? "page" : undefined}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
        <li className="nav-end">
          <form action={logout}>
            <button type="submit" className="nav-link">
              <svg {...svgProps}>
                <path d="M8 3H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h3" />
                <path d="M13 6l4 4-4 4" />
                <path d="M17 10H8" />
              </svg>
              <span>Log out</span>
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
}
