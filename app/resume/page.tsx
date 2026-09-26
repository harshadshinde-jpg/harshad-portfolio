"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { track } from "@/lib/posthog";

// ─── Data (verified against canonical work history) ────────────────────────────
const experience = [
  {
    company: "Versapay",
    role: "Senior Product Manager, AR Automation",
    type: "Full-time",
    period: "2026 – Present",
    location: "Vancouver, BC",
    bullets: [
      "Own product strategy for AR Automation within Versapay's Ledger Platform, formed through five acquisitions (Versapay, Solupay, ChargeLogic, 2CP, DadeSystems).",
      "Working from a \"unified ledger first\" thesis: consolidate ledger infrastructure ahead of any customer-facing gateway consolidation.",
      "Partnering with engineering, finance, and go-to-market leadership to shape the roadmap for a platform serving mid-market and enterprise AR teams.",
    ],
  },
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
    role: "Senior Product Manager, Payments & Billing",
    type: "Full-time",
    period: "Jul 2022 – Jun 2024",
    location: "Remote",
    bullets: [
      "Part of a multi-PM program (~4 PMs) owning Mindbody's payments, billing, and POS platform for wellness businesses globally.",
      "Personally owned the dispute resolution tool, autopay retry modernization, and the phased rollout across my assigned zones during the migration from TSYS/Global Payments to Stripe-powered infrastructure.",
      "Defined requirements, acceptance criteria, and data-flow specifications for backend services and API integrations, working hands-on with engineering through sprint planning and delivery.",
      "Used transaction data, customer feedback, and support insights to improve transaction success rates, reconciliation accuracy, and dispute-resolution efficiency.",
    ],
  },
  {
    company: "Avalara",
    role: "Product Manager, Cross-Border Compliance & Integrations",
    type: "Full-time",
    period: "Jan 2019 – Jun 2022",
    location: "India (Remote)",
    bullets: [
      "Owned the product roadmap for cross-border tax and duty automation - an integration-heavy platform connecting enterprise customers to compliance engines through APIs, EDI, and ERP connectors (SAP, NetSuite).",
      "Translated multi-jurisdiction regulatory requirements into structured epics, user stories, and acceptance criteria for globally distributed engineering teams across India, the US, and Europe.",
      "Worked directly with enterprise customers across North America, Europe, and APAC to validate solutions and drive platform adoption.",
    ],
  },
  {
    company: "Avalara",
    role: "Product Manager, India GST Platform (0-to-1 Launch)",
    type: "Full-time",
    period: "Mar 2017 – Jun 2019",
    location: "India",
    bullets: [
      "Led the end-to-end launch of Avalara TrustFile GST from concept to market during India's national GST rollout.",
      "Built enterprise integrations with government APIs (GSTN), designing validation workflows and filing systems for thousands of businesses.",
      "Drove cross-functional delivery across engineering, sales, marketing, and compliance, acquiring first customers and iterating post-launch on adoption data.",
    ],
  },
  {
    company: "Avalara",
    role: "Product Specialist",
    type: "",
    period: "Jul 2015 – Feb 2017",
    location: "India",
    bullets: [
      "Provided domain expertise on Indian tax compliance, informing early product roadmap decisions and integration architecture for Avalara's market entry.",
    ],
  },
  {
    company: "R.K. Shinde & Co.",
    role: "Managing Partner, Indirect Tax Practice",
    type: "",
    period: "Jul 2006 – Feb 2017",
    location: "India",
    bullets: [
      "Ran the firm's indirect tax practice for a decade, advising SME and enterprise clients on compliance, filings, and regulatory change.",
    ],
  },
];

const skills = [
  "Payments Infrastructure & Billing",
  "AR Automation & Ledger Consolidation",
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
    event: "MBA Product Hackathon",
    bullets: [
      "Built a browser-based real-time queuing system for walk-in clinics - no app, no account, no hardware required.",
      "BC patients wait an average of 93 minutes (longest in Canada) with zero queue visibility; EasyQueue gives patients a token link at check-in and staff a simple dashboard.",
      "Full PM process: user interviews, patient surveys, ICP definition, persona development, and a north-star metric (LWBS rate reduction).",
    ],
  },
  {
    name: "ProductBC Build-a-thon — Working React Prototype",
    event: "ProductBC · Vancouver, BC",
    bullets: [
      "Defined the problem, ran user interviews, and shipped a working React application solo, using Claude as a coding collaborator.",
      "Demonstrated ownership of the full product loop: discovery, definition, and delivery.",
    ],
  },
];

// ─── Print button ─────────────────────────────────────────────────────────────
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

function SectionHead({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <h2 className="text-base font-bold uppercase tracking-widest" style={{ color: "#E8630A", fontFamily: "Georgia, serif" }}>
        {title}
      </h2>
      <div className="flex-1 h-px" style={{ background: "#E8630A", opacity: 0.3 }} />
    </div>
  );
}

export default function ResumePage() {
  useEffect(() => {
    track("resume_page_viewed");
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FAF8F4" }}>
      <div className="flex items-center justify-between px-6 py-3 print:hidden" style={{ borderBottom: "1px solid rgba(23,22,28,0.10)", background: "#FAF8F4" }}>
        <Link href="/" className="text-sm font-medium transition-all hover:opacity-70" style={{ color: "#6B6A72", textDecoration: "none" }}>
          ← Back
        </Link>
        <PrintButton />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-6 py-10 pb-20"
      >
        <div className="mb-8 pb-6" style={{ borderBottom: "2px solid #E8630A" }}>
          <h1 className="text-4xl font-bold mb-1" style={{ fontFamily: "Georgia, serif", color: "#17161C" }}>
            Harshad Shinde
          </h1>
          <p className="text-base font-medium mb-3" style={{ color: "#E8630A" }}>
            Senior Product Manager — Payments, Platform & Compliance Systems
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: "#555" }}>
            <span>Vancouver, BC, Canada</span>
            <span>·</span>
            <a href="mailto:harshadshinde@gmail.com" style={{ color: "#E8630A" }}>harshadshinde@gmail.com</a>
            <span>·</span>
            <a href="https://linkedin.com/in/harshadshindepm" target="_blank" rel="noopener noreferrer" style={{ color: "#E8630A" }}>
              linkedin.com/in/harshadshindepm
            </a>
          </div>
        </div>

        <section className="mb-8">
          <SectionHead title="Professional Summary" />
          <p className="text-sm leading-relaxed" style={{ color: "#333", lineHeight: 1.8 }}>
            Senior Product Manager with 8+ years of experience building and shipping B2B SaaS products
            across payments infrastructure, billing systems, compliance automation, and integration-heavy
            platforms. Currently leading AR Automation product strategy at Versapay. I enjoy the parts of
            product that most people avoid: mapping messy end-to-end flows, translating complex regulatory
            and business requirements into clear product specs, and guiding teams toward the real problem
            rather than the loudest one. Comfortable in both structured enterprise environments and scrappy
            startup settings. Based in Vancouver, open to remote roles across Canada.
          </p>
        </section>

        <section className="mb-8">
          <SectionHead title="Core Competencies" />
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="text-xs px-2.5 py-1 rounded" style={{ background: "rgba(232,99,10,0.08)", color: "#333", border: "1px solid rgba(232,99,10,0.18)" }}>
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <SectionHead title="Professional Experience" />
          <div className="space-y-7">
            {experience.map((job, i) => (
              <div key={i}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-0.5 gap-0.5">
                  <h3 className="text-base font-bold" style={{ color: "#17161C", fontFamily: "Georgia, serif" }}>
                    {job.role}
                  </h3>
                  <span className="text-xs shrink-0" style={{ color: "#888", fontFamily: "Courier New, monospace" }}>
                    {job.period}
                  </span>
                </div>
                <div className="text-sm mb-2" style={{ color: "#E8630A", fontWeight: 500 }}>
                  {job.company}
                  <span className="ml-2 font-normal" style={{ color: "#999" }}>
                    {job.type ? `${job.type} · ` : ""}{job.location}
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

        <section className="mb-8">
          <SectionHead title="Projects & Hackathons" />
          <div className="space-y-6">
            {hackathons.map((h, i) => (
              <div key={i}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-0.5 gap-0.5">
                  <h3 className="text-base font-bold" style={{ color: "#17161C", fontFamily: "Georgia, serif" }}>
                    {h.name}
                  </h3>
                  <span className="text-xs shrink-0" style={{ color: "#888", fontFamily: "Courier New, monospace" }}>
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

        <section className="mb-8">
          <SectionHead title="Education" />
          <div className="space-y-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-0.5 gap-0.5">
                <h3 className="text-base font-bold" style={{ color: "#17161C", fontFamily: "Georgia, serif" }}>
                  Master of Business Administration (MBA)
                </h3>
                <span className="text-xs shrink-0" style={{ color: "#888", fontFamily: "Courier New, monospace" }}>
                  Jul 2024 – Dec 2025
                </span>
              </div>
              <p className="text-sm" style={{ color: "#555" }}>
                Product Strategy, Technology Management & Data-Driven Decision Making · University Canada West, Vancouver, BC
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold mb-0.5" style={{ color: "#17161C", fontFamily: "Georgia, serif" }}>
                Bachelor of Commerce (BCom)
              </h3>
              <p className="text-sm" style={{ color: "#555" }}>
                Savitribai Phule Pune University · India
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <SectionHead title="Tools & Methods" />
          <p className="text-sm" style={{ color: "#555", lineHeight: 1.8 }}>
            {tools.join(" · ")}
          </p>
        </section>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden" style={{ borderTop: "1px solid rgba(23,22,28,0.10)" }}>
          <Link href="/" className="text-sm hover:opacity-70 transition-opacity" style={{ color: "#999", textDecoration: "none" }}>
            ← Back
          </Link>
          <PrintButton />
        </div>

        <div className="hidden print:block pt-4 text-xs text-center" style={{ color: "#aaa" }}>
          harshadshinde@gmail.com · linkedin.com/in/harshadshindepm · Vancouver, BC
        </div>
      </motion.div>
    </div>
  );
}
