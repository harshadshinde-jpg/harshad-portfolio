"use client";

import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import ContactBar from "@/components/ContactBar";
import { track } from "@/lib/posthog";

const TOPMATE_URL = "https://topmate.io/harshadshindepm";

type Service = {
  id: string;
  type: string;
  duration: string;
  title: string;
  price: string;
  popular?: boolean;
};

const SERVICES: Service[] = [
  { id: "discovery-call", type: "Video meeting", duration: "15 mins", title: "Discovery Call", price: "Free" },
  { id: "priority-dm", type: "Priority DM", duration: "2 day reply", title: "Priority DM", price: "Free" },
  { id: "1-1-mentorship", type: "Video meeting", duration: "30 mins", title: "1:1 Mentorship", price: "C$40", popular: true },
  { id: "breaking-into-pm", type: "Video meeting", duration: "30 mins", title: "Breaking into PM", price: "C$40" },
  { id: "career-guidance", type: "Video meeting", duration: "30 mins", title: "Career guidance", price: "C$40" },
  { id: "quick-chat", type: "Video meeting", duration: "30 mins", title: "Quick chat", price: "C$40" },
  { id: "resume-review", type: "Video meeting", duration: "30 mins", title: "Resume review", price: "C$40" },
  { id: "mock-interview", type: "Video meeting", duration: "60 mins", title: "Mock interview", price: "C$60" },
];

const WHO_ITS_FOR = [
  "You're trying to break into product management, from any background.",
  "You're new to the Canadian job market and want a straight-talking read on your resume, story, or approach.",
  "You want mock-interview reps with someone who's been on both sides of the table.",
  "You just want a second opinion before you send that application.",
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.a
      href={`${TOPMATE_URL}?utm_source=portfolio&utm_medium=mentorship&utm_content=${service.id}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 2) * 0.06 }}
      onClick={() => track("topmate_click", { source: "mentorship_page", service: service.id })}
      className="group flex flex-col justify-between rounded-2xl p-6 transition-transform hover:scale-[1.02]"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(23,22,28,0.10)",
        textDecoration: "none",
        color: "#17161C",
      }}
    >
      <div>
        <div className="text-xs font-mono-label uppercase mb-2" style={{ color: "#8C8B92" }}>
          {service.type} · {service.duration}
        </div>
        <div className="text-lg font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
          {service.title}
        </div>
      </div>
      <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(23,22,28,0.08)" }}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{service.price}</span>
          {service.popular && (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "var(--orange-tint-strong)", color: "#B84E06" }}
            >
              Popular
            </span>
          )}
        </div>
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-transform group-hover:translate-x-0.5"
          style={{ background: "#17161C", color: "white" }}
        >
          →
        </span>
      </div>
    </motion.a>
  );
}

export default function MentorshipPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FDEFE4" }}>
      <NavBar />

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-5 pt-16 pb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono-label uppercase mb-4"
          style={{ color: "#B84E06" }}
        >
          Mentorship & coaching
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-balance"
          style={{ fontFamily: "Georgia, serif", color: "#17161C", lineHeight: 1.2 }}
        >
          Breaking into product management is hard. I can help.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "#6B6A72", lineHeight: 1.7 }}
        >
          I moved into product from an unconventional background myself, and I've spent the last
          few years helping friends and mentees do the same - resumes, mock interviews, and honest
          career advice. Book time with me directly below.
        </motion.p>
      </section>

      {/* Who it's for */}
      <section className="max-w-3xl mx-auto px-5 pb-16">
        <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(23,22,28,0.08)" }}>
          <h2 className="text-sm font-mono-label uppercase mb-4" style={{ color: "#8C8B92" }}>
            This is probably for you if
          </h2>
          <ul className="space-y-3">
            {WHO_ITS_FOR.map((line) => (
              <li key={line} className="flex gap-3 text-base" style={{ color: "#17161C", lineHeight: 1.6 }}>
                <span style={{ color: "#E8630A", flexShrink: 0 }}>▸</span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-5xl mx-auto px-5 pb-20">
        <h2
          className="text-2xl font-bold mb-2 text-center"
          style={{ fontFamily: "Georgia, serif", color: "#17161C" }}
        >
          Book a session
        </h2>
        <p className="text-sm text-center mb-10" style={{ color: "#6B6A72" }}>
          All sessions are booked and paid through TopMate. Not sure which one you need? Start
          with the free Discovery Call.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href={`${TOPMATE_URL}?utm_source=portfolio&utm_medium=mentorship&utm_content=view_all`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold px-6 py-3 rounded-full transition-transform hover:scale-105"
            style={{ background: "#17161C", color: "white", textDecoration: "none" }}
            onClick={() => track("topmate_click", { source: "mentorship_page", service: "view_all" })}
          >
            View full TopMate profile →
          </a>
        </div>
      </section>

      <div className="pb-contact" />
      <ContactBar />
    </div>
  );
}
