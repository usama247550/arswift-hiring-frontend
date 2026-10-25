"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";

// The login page shows on its own, without the side menu.
export default function Shell({ children }) {
  const pathname = usePathname();
  if (pathname === "/login") return children;

  return (
    <>
      <div className="topbar">AR Swift Hiring</div>
      <div className="shell">
        <Nav />
        <main className="main">{children}</main>
      </div>
    </>
  );
}
