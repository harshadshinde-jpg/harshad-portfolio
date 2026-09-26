"use client";

import { track } from "@/lib/posthog";

export default function ContactBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4"
      style={{ background: "#E8630A", minHeight: "48px", padding: "8px 16px" }}
    >
      <span className="text-white font-semibold text-sm">Let&apos;s talk</span>
      <a
        href="https://topmate.io/harshadshindepm?utm_source=portfolio&utm_medium=contact_bar"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white text-sm underline underline-offset-2 hover:opacity-80 transition-opacity"
        onClick={() => track("topmate_click", { source: "contact_bar" })}
      >
        Book on TopMate
      </a>
      <span className="text-white opacity-50 text-sm">·</span>
      <a
        href="mailto:harshadshinde@gmail.com"
        className="text-white text-sm underline underline-offset-2 hover:opacity-80 transition-opacity"
        onClick={() => track("email_clicked", { source: "contact_bar" })}
      >
        harshadshinde@gmail.com
      </a>
      <span className="text-white opacity-50 text-sm">·</span>
      <a
        href="https://linkedin.com/in/harshadshindepm"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white text-sm underline underline-offset-2 hover:opacity-80 transition-opacity"
        onClick={() => track("linkedin_clicked", { source: "contact_bar" })}
      >
        LinkedIn
      </a>
    </div>
  );
}
