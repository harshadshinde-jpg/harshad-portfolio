"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/posthog";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/mentorship", label: "Mentorship" },
  { href: "/resume", label: "Resume" },
];

export default function NavBar({ dark = false }: { dark?: boolean }) {
  const pathname = usePathname();

  const textColor = dark ? "rgba(255,255,255,0.85)" : "#17161C";
  const mutedColor = dark ? "rgba(255,255,255,0.55)" : "#6B6A72";
  const borderColor = dark ? "rgba(255,255,255,0.12)" : "rgba(23,22,28,0.10)";

  return (
    <header
      className="sticky top-0 z-40 w-full backdrop-blur"
      style={{
        borderBottom: `1px solid ${borderColor}`,
        background: dark ? "rgba(20,19,26,0.85)" : "rgba(250,248,244,0.85)",
      }}
    >
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight"
          style={{ color: textColor, fontFamily: "Georgia, serif", textDecoration: "none" }}
          onClick={() => track("nav_home_clicked")}
        >
          Harshad Shinde
        </Link>
        <nav className="flex items-center gap-5">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-opacity hover:opacity-100"
                style={{
                  color: active ? "#E8630A" : mutedColor,
                  textDecoration: "none",
                }}
                onClick={() => track("nav_link_clicked", { href: link.href })}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://topmate.io/harshadshindepm?utm_source=portfolio&utm_medium=nav"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-4 py-2 rounded-full transition-transform hover:scale-105"
            style={{ background: "#E8630A", color: "white", textDecoration: "none" }}
            onClick={() => track("topmate_click", { source: "nav" })}
          >
            Book time
          </a>
        </nav>
      </div>
    </header>
  );
}
