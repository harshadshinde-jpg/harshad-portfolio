"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { track } from "@/lib/posthog";

// ─── Data ─────────────────────────────────────────────────────────────────────
const experience = [
  {
    company: "PavePal",
    role: "Technical Product Manager",
    type: "Contract (Startup)",
    period: "Feb 2025 – May 2025",
    location: "Vancouver, BC (Remote)",
    bullets: [
      "Owned roadmap and execution for platform components integrating AI outputs into operational workflows at an early-stage startup, working directly with the founding team and engineering.",
      "Led product discovery with municipal stakeholders, translating complex operational requirements into clear specs, user stories, and data flow designs for engineering.",
      "Used AI tools (Claude) extensively across product workflows for discovery, prototyping, technical documentation, and accelerating decision-making.",
    ],
  },
  {
    company: "Mindbody",
    role: "Product Manager — Payments & Billing Platform",
    type: "Full-time",
    period: "Jul 2022 – Jun 2024",
    location: "Remote",
    bullets: [
      "Owned the product roadmap for Mindbody's payments, billing, and POS platform serving 1,800+ businesses, driving features across recurring billing, dispute management, ACH, checkout flows, and payout systems.",
      "Led the complex migration to Stripe-powered payments infrastructure, coordinating across engineering, finance, compliance, and customer operations to deliver a multi-team platform transition with zero disruption to live merchants.",
      "Defined detailed requirements, acceptance criteria, and data flow specifications for backend services and API integrations, working hands-on with engineering throughout sprint planning and delivery.",
      "Used transaction data, customer feedback, and support insights to drive prioritisation, improving transaction success rates, reconciliation accuracy, and dispute resolution efficiency.",
      "Collaborated cross-functionally with engineering, UX, sales, marketing, finance, compliance, and customer operations to align on roadmap priorities and ensure successful product launches.",
    ],
  },
  {
    company: "Avalara",
    role: "Product Manager — Cross-Border Compliance & Integrations",
    type: "Full-time",
    period: "Jan 2019 – Jun 2022",
    location: "India (Remote)",
    bullets: [
      "Owned the product roadmap for cross-border tax and duty automation products — an integration-heavy platform connecting enterprise customers to compliance engines through APIs, EDI, and ERP connectors (SAP, NetSuite).",
      "Translated complex multi-jurisdiction regulatory requirements into structured epics, user stories, and acceptance criteria for globally distributed engineering teams across India, US, and Europe.",
      "Designed and improved data ingestion pipelines, rule-building logic, classification workflows, and electronic data exchange systems, partnering closely with architects on system design and technical trade-offs.",
      "Worked directly with enterprise customers across North America, Europe, and APAC to understand complex workflows, validate solutions, and drive platform adoption and go-to-market efforts.",
    ],
  },
  {
    company: "Avalara",
    role: "Product Manager — India GST Platform (0-to-1 Launch)",
    type: "Full-time",
    period: "Mar 2017 – Jun 2019",
    location: "India",
    bullets: [
      "Led the end-to-end launch of Avalara TrustFile GST from concept to market, owning roadmap definition, requirements, and go-to-market execution during India's national GST rollout.",
      "Built enterprise integrations with government APIs (GSTN), designing validation workflows, filing systems, and multi-jurisdiction compliance features for thousands of businesses.",
      "Drove cross-functional delivery across engineering, sales, marketing, compliance, and customer support, acquiring first customers and optimising post-launch based on adoption data and user feedback.",
    ],
  },
  {
    company: "Avalara",
    role: "Product Management Specialist",
    type: "Freelance",
    period: "Jul 2015 – Feb 2017",
    location: "India",
    bullets: [
      "Provided domain expertise on Indian tax compliance, informing early product roadmap decisions, integration architecture, and workflow design for Avalara's market entry.",
    ],
  },
];

const skills = [
  "Payments Infrastructure & Billing",
  "Compliance & Regulatory Systems",
  "API & Integration Products",
  "B2B SaaS Platforms",
  "0-to-1 Product Launches",
  "Platform Migrations",
  "Enterprise Customer Engagement",
  "Requirements & Acceptance Criteria",
  "Data Pipelines & ERP Connectors (SAP, NetSuite)",
  "Agile / Scrum",
  "Cross-Functional Leadership",
  "Data-Driven Prioritisation",
  "SQL & Product Analytics",
  "AI Tools (Claude, Prototyping)",
  "Stakeholder Communication",
];

const tools = [
  "Jira", "Confluence", "SQL", "REST APIs", "Stripe APIs",
  "ERP/EDI Integrations (SAP, NetSuite)", "Claude AI", "Figma",
  "Miro", "OKRs", "Product Analytics", "User Story Mapping",
  "Technical Documentation", "A/B Testing",
];

const hackathons = [
  {
    name: "EasyQueue — Healthcare Queuing for Walk-In Clinics",
    event: "MBA Product Hackathon · 2025–2026",
    bullets: [
      "Built a browser-based real-time queuing system for walk-in clinics — no app, no account, no hardware required.",
      "BC patients wait an average of 93 minutes (longest in Canada) with zero queue visibility. MOAs lose 20–33% of peak shift answering questions they can't answer accurately.",
      "EasyQueue gives patients a token link at check-in; ETA page auto-refreshes. Staff get a simple dashboard. No workflow change required.",
      "Full PM process: user interviews, patient surveys, ICP definition, persona development, assumptions mapping, north star metric (LWBS rate reduction).",
    ],
  },
  {
    name: "ProductBC Build-a-thon — Working React Prototype",
    event: "ProductBC · Vancouver, BC",
    bullets: [
      "Defined the problem, ran user interviews, and shipped a working React application solo — using Claude as a coding collaborator.",
      "Demonstrated that a PM can own the full product loop: discovery, definition, and delivery.",
    ],
  },
];

// ─── Print button (client-side only) ─────────────────────────────────────────
function PrintButton() {
  return (
    <button
      onClick={() => {
        track("resume_printed");
        window.print();
      }}
      className="text-sm px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 print:hidden"
      style={{ background: "#E8630A", color: "white" }}
    >
      Print / Save PDF
    </button>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHead({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <h2
        className="text-base font-bold uppercase tracking-widest"
        style={{ color: "#E8630A", fontFamily: "Georgia, serif" }}
      >
        {title}
      </h2>
      <div className="flex-1 h-px" style={{ background: "#E8630A", opacity: 0.3 }} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ResumePage() {
  useEffect(() => {
    track("resume_page_viewed");
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#F8F7F2" }}>

      {/* ── Top nav bar (hidden on print) ── */}
      <div
        className="flex items-center justify-between px-6 py-3 print:hidden"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", background: "#F8F7F2" }}
      >
        <Link
          href="/"
          className="text-sm font-medium transition-all hover:opacity-70"
          style={{ color: "#666", textDecoration: "none" }}
        >
          ← Back
        </Link>
        <PrintButton />
      </div>

      {/* ── Resume body ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-6 py-10 pb-20"
      >

        {/* ── Header ── */}
        <div className="mb-8 pb-6" style={{ borderBottom: "2px solid #E8630A" }}>
          <h1
            className="text-4xl font-bold mb-1"
            style={{ fontFamily: "Georgia, serif", color: "#1A1A1A" }}
          >
            Harshad Shinde
          </h1>
          <p
            className="text-base font-medium mb-3"
            style={{ color: "#E8630A" }}
          >
            Senior Product Manager — Payments, Platform & Compliance Systems
          </p>
          <div
            className="flex flex-wrap gap-x-4 gap-y-1 text-sm"
            style={{ color: "#555" }}
          >
            <span>Vancouver, BC, Canada</span>
            <span>·</span>
            <a href="mailto:harshadshinde@gmail.com" style={{ color: "#E8630A" }}>
              harshadshinde@gmail.com
            </a>
            <span>·</span>
            <span>+1 (672) 337-2241</span>
            <span>·</span>
            <a
              href="https://linkedin.com/in/harshadshindepm"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#E8630A" }}
            >
              linkedin.com/in/harshadshindepm
            </a>
          </div>
        </div>

        {/* ── Summary ── */}
        <section className="mb-8">
          <SectionHead title="Professional Summary" />
          <p className="text-sm leading-relaxed" style={{ color: "#333", lineHeight: 1.8 }}>
            Senior Product Manager with 8+ years of experience building and shipping B2B SaaS products
            across payments infrastructure, billing systems, compliance automation, and
            integration-heavy platforms. I enjoy the parts of product that most people avoid: mapping
            messy end-to-end flows, translating complex regulatory and business requirements into clear
            product specs, and guiding teams toward the real problem rather than the loudest one. Deep
            hands-on experience with APIs, data pipelines, ERP connectors, and backend services. Proven
            track record owning roadmaps end-to-end, launching products from 0 to 1, leading complex
            platform migrations, and working directly with enterprise customers across global markets.
            Comfortable in both structured enterprise environments and scrappy startup settings. Based
            in Vancouver, open to remote roles across Canada.
          </p>
        </section>

        {/* ── Core Competencies ── */}
        <section className="mb-8">
          <SectionHead title="Core Competencies" />
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="text-xs px-2.5 py-1 rounded"
                style={{
                  background: "rgba(232,99,10,0.08)",
                  color: "#333",
                  border: "1px solid rgba(232,99,10,0.18)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* ── Experience ── */}
        <section className="mb-8">
          <SectionHead title="Professional Experience" />
          <div className="space-y-7">
            {experience.map((job, i) => (
              <div key={i}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-0.5 gap-0.5">
                  <h3 className="text-base font-bold" style={{ color: "#1A1A1A", fontFamily: "Georgia, serif" }}>
                    {job.role}
                  </h3>
                  <span
                    className="text-xs shrink-0"
                    style={{ color: "#888", fontFamily: "Courier New, monospace" }}
                  >
                    {job.period}
                  </span>
                </div>
                <div className="text-sm mb-2" style={{ color: "#E8630A", fontWeight: 500 }}>
                  {job.company}
                  <span className="ml-2 font-normal" style={{ color: "#999" }}>
                    {job.type} · {job.location}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-sm" style={{ color: "#444", lineHeight: 1.7 }}>
                      <span style={{ color: "#E8630A", flexShrink: 0 }}>▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Hackathons & Projects ── */}
        <section className="mb-8">
          <SectionHead title="Projects & Hackathons" />
          <div className="space-y-6">
            {hackathons.map((h, i) => (
              <div key={i}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-0.5 gap-0.5">
                  <h3 className="text-base font-bold" style={{ color: "#1A1A1A", fontFamily: "Georgia, serif" }}>
                    {h.name}
                  </h3>
                  <span
                    className="text-xs shrink-0"
                    style={{ color: "#888", fontFamily: "Courier New, monospace" }}
                  >
                    {h.event}
                  </span>
                </div>
                <ul className="space-y-1.5 mt-2">
                  {h.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-sm" style={{ color: "#444", lineHeight: 1.7 }}>
                      <span style={{ color: "#E8630A", flexShrink: 0 }}>▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education ── */}
        <section className="mb-8">
          <SectionHead title="Education" />
          <div className="space-y-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-0.5 gap-0.5">
                <h3 className="text-base font-bold" style={{ color: "#1A1A1A", fontFamily: "Georgia, serif" }}>
                  Master of Business Administration (MBA)
                </h3>
                <span className="text-xs shrink-0" style={{ color: "#888", fontFamily: "Courier New, monospace" }}>
                  Dec 2025
                </span>
              </div>
              <p className="text-sm" style={{ color: "#555" }}>
                Product Strategy, Technology Management & Data-Driven Decision Making · Vancouver, BC
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold mb-0.5" style={{ color: "#1A1A1A", fontFamily: "Georgia, serif" }}>
                Bachelor of Commerce (BCom)
              </h3>
              <p className="text-sm" style={{ color: "#555" }}>
                Savitribai Phule Pune University · India
              </p>
            </div>
          </div>
        </section>

        {/* ── Tools ── */}
        <section className="mb-10">
          <SectionHead title="Tools & Methods" />
          <p className="text-sm" style={{ color: "#555", lineHeight: 1.8 }}>
            {tools.join(" · ")}
          </p>
        </section>

        {/* ── Footer ── */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden"
          style={{ borderTop: "1px solid rgba(0,0,0,0.10)" }}
        >
          <Link
            href="/"
            className="text-sm hover:opacity-70 transition-opacity"
            style={{ color: "#999", textDecoration: "none" }}
          >
            ← Back to the world
          </Link>
          <PrintButton />
        </div>

        {/* Print-only footer */}
        <div className="hidden print:block pt-4 text-xs text-center" style={{ color: "#aaa" }}>
          harshadshinde@gmail.com · linkedin.com/in/harshadshindepm · Vancouver, BC
        </div>

      </motion.div>
    </div>
  );
}
