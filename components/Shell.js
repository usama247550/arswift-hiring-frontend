"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import { BellIcon } from "@/components/Icons";

const KEY = "arswift_nav_collapsed";

// Side menu on every page except the login page.
// Desktop: the menu can shrink to icons only. Phone: it slides in from the left.
export default function Shell({ children }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Remember the desktop choice in this browser. Without it the menu simply starts open.
  useEffect(() => {
    try {
      if (window.localStorage.getItem(KEY) === "1") setCollapsed(true);
    } catch {
      /* storage blocked: ignore */
    }
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Close the phone menu after choosing a page, and with the Escape key.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Keep the page from scrolling behind the open phone menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function toggleCollapsed() {
    setCollapsed((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(KEY, next ? "1" : "0");
      } catch {
        /* storage blocked: ignore */
      }
      return next;
    });
  }

  if (pathname === "/login") return children;

  return (
    <div className={`shell${collapsed ? " is-collapsed" : ""}${ready ? "" : " no-anim"}`}>
      <div className={`scrim${open ? " is-on" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />

      <Nav
        collapsed={collapsed}
        open={open}
        onToggleCollapsed={toggleCollapsed}
        onClose={() => setOpen(false)}
      />

      <div className="col">
        <header className="topbar">
          <button
            type="button"
            className="burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
          <span className="topbar-title">AR Swift Hiring</span>
          <span className="topbar-gap" />
          <Link href="/review" className="top-bell" aria-label="Answers to review" title="Answers to review">
            <BellIcon width={20} height={20} />
          </Link>
          <span className="top-user">
            <span className="top-avatar" aria-hidden="true">AS</span>
            <span className="top-name">AR Swift</span>
          </span>
        </header>

        <main className="main">{children}</main>
      </div>
    </div>
  );
}
