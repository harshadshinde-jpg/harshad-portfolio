"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import ContactBar from "@/components/ContactBar";
import { track } from "@/lib/posthog";

const FACTS = [
  { label: "Experience", value: "8+ years" },
  { label: "Domain", value: "Payments · Tax · Compliance · ERP" },
  { label: "Based in", value: "Vancouver, BC" },
  { label: "Currently", value: "Senior PM, Payments Infrastructure @ Versapay" },
];

const PATHS = [
  {
    id: "work",
    href: "/work",
    kicker: "For hiring managers & fellow PMs",
    title: "See the work",
    body: "8+ years owning payments, billing, and compliance products for real businesses - the roles, the migrations, the 0-to-1 launches.",
    cta: "View experience",
    bg: "#14131A",
    fg: "#FFFFFF",
    accent: "#E8630A",
  },
  {
    id: "mentorship",
    href: "/mentorship",
    kicker: "For PMs breaking in",
    title: "Book time with me",
    body: "I mentor people making the same jump I made - into product management, often from an unconventional background. Book a call on TopMate.",
    cta: "See mentorship options",
    bg: "#FDEFE4",
    fg: "#17161C",
    accent: "#E8630A",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF8F4" }}>
      <NavBar />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-5 pt-16 pb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-mono-label uppercase mb-4"
          style={{ color: "#8C8B92" }}
        >
          Harshad Shinde
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-balance"
          style={{ fontFamily: "Georgia, serif", color: "#17161C", lineHeight: 1.15 }}
        >
          Senior Product Manager for financial infrastructure.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: "#6B6A72", lineHeight: 1.6 }}
        >
          I spend my career making payments, billing, and compliance invisible for the
          businesses that depend on them - and I mentor the next wave of PMs making
          the same career jump I did.
        </motion.p>
      </section>

      {/* Facts strip */}
      <section className="max-w-4xl mx-auto px-5 pb-16 w-full">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl overflow-hidden"
          style={{ background: "rgba(23,22,28,0.10)" }}
        >
          {FACTS.map((fact) => (
            <div key={fact.label} className="p-5" style={{ background: "#FAF8F4" }}>
              <div
                className="text-xs font-mono-label uppercase mb-1"
                style={{ color: "#8C8B92" }}
              >
                {fact.label}
              </div>
              <div className="text-sm font-semibold" style={{ color: "#17161C" }}>
                {fact.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two paths */}
      <section className="max-w-5xl mx-auto px-5 pb-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PATHS.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={path.href}
                onClick={() => track("home_path_selected", { path: path.id })}
                className="group block h-full rounded-2xl p-8 transition-transform hover:scale-[1.02]"
                style={{
                  background: path.bg,
                  color: path.fg,
                  textDecoration: "none",
                  border: "1px solid rgba(23,22,28,0.06)",
                }}
              >
                <div
                  className="text-xs font-mono-label uppercase mb-4"
                  style={{ color: path.accent }}
                >
                  {path.kicker}
                </div>
                <h2
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {path.title}
                </h2>
                <p
                  className="text-base mb-8"
                  style={{
                    color: path.fg === "#FFFFFF" ? "rgba(255,255,255,0.68)" : "#6B6A72",
                    lineHeight: 1.7,
                  }}
                >
                  {path.body}
                </p>
                <div
                  className="text-sm font-semibold inline-flex items-center gap-2 transition-transform group-hover:gap-3"
                  style={{ color: path.accent }}
                >
                  {path.cta} <span>→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="pb-contact" />
      <ContactBar />
    </div>
  );
}
