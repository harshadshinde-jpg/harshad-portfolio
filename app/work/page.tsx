"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import NavBar from "@/components/NavBar";
import ContactBar from "@/components/ContactBar";
import { track } from "@/lib/posthog";

// ─── Experience data (verified against canonical work history) ────────────────
const experience = [
  {
    company: "Versapay",
    role: "Senior Product Manager, Payments Infrastructure",
    period: "2026 – Present",
    type: "Full-time",
    location: "Vancouver, BC",
    bullets: [
      "Own product strategy for AR Automation within Versapay's Ledger Platform, formed through five acquisitions (Versapay, Solupay, ChargeLogic, 2CP, DadeSystems).",
      "Working from a \"unified ledger first\" thesis: consolidate ledger infrastructure - the additive, internal-facing step - ahead of any customer-facing gateway consolidation.",
      "Partnering with engineering, finance, and go-to-market leadership to shape the roadmap for a platform serving mid-market and enterprise AR teams.",
    ],
  },
  {
    company: "PavePal",
    role: "Technical Product Manager",
    period: "Feb 2025 – May 2025",
    type: "Contract (Startup)",
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
    period: "Jul 2022 – Jun 2024",
    type: "Full-time",
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
    period: "Jan 2019 – Jun 2022",
    type: "Full-time",
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
    period: "Mar 2017 – Jun 2019",
    type: "Full-time",
    location: "India",
    bullets: [
      "Led the end-to-end launch of Avalara TrustFile GST from concept to market during India's national GST rollout.",
      "Built integrations with government APIs (GSTN), designing validation workflows and filing systems for thousands of businesses.",
      "Drove cross-functional delivery across engineering, sales, marketing, and compliance, acquiring first customers and iterating post-launch on adoption data.",
    ],
  },
  {
    company: "Avalara",
    role: "Product Specialist",
    period: "Jul 2015 – Feb 2017",
    type: "",
    location: "India",
    bullets: [
      "Provided domain expertise on Indian tax compliance, informing early product roadmap decisions and integration architecture for Avalara's market entry.",
    ],
  },
  {
    company: "R.K. Shinde & Co.",
    role: "Managing Partner, Indirect Tax Practice",
    period: "Jul 2006 – Feb 2017",
    type: "",
    location: "India",
    bullets: [
      "Ran the firm's indirect tax practice for a decade, advising SME and enterprise clients on compliance, filings, and regulatory change.",
      "That regulatory and accounting background is the foundation of a product career built around compliance-heavy, high-trust financial systems.",
    ],
  },
];

const skills = {
  product: [
    "Payments infrastructure & recurring billing",
    "Tax compliance & regulatory systems",
    "ERP integrations - SAP, NetSuite, EDI",
    "AR automation & ledger consolidation",
    "Cross-border commerce & multi-jurisdiction tax",
    "Platform migrations",
    "0-to-1 product launches",
    "Data-driven roadmapping & prioritisation",
    "Stakeholder alignment across eng, finance, legal",
  ],
  technical: [
    "Jira · Confluence · Linear",
    "SQL & product analytics",
    "REST APIs · Stripe APIs · GSTN APIs",
    "ERP/EDI integrations (SAP, NetSuite)",
    "React prototyping (AI-assisted, Claude)",
    "Figma · Miro",
    "Agile/Scrum · OKRs",
    "A/B testing · PostHog · Amplitude",
  ],
};

const caseStudies = [
  {
    tag: undefined,
    title: "Mindbody — Payments Platform & TSYS-to-Stripe Migration",
    role: "Senior Product Manager, Payments & Billing · Jul 2022 – Jun 2024",
    body:
      "Part of a multi-PM program owning the payments, billing, and POS platform for wellness businesses globally. My piece of the TSYS/Global Payments-to-Stripe migration was the dispute resolution tool, autopay retry modernization, and the phased rollout for my zones - merchant communication, rollback planning, billing-logic reconciliation, and failure-scenario mapping, on a program with real revenue and live merchants on the line.",
    quote: "The best payment experience is the one nobody notices.",
  },
  {
    tag: undefined,
    title: "Avalara — Cross-Border Tax Compliance & ERP Integrations",
    role: "Product Manager, Compliance · Jan 2019 – Jun 2022",
    body:
      "Owned products at the intersection of global commerce and regulatory complexity - multi-jurisdiction tax rules, cross-border duty calculation, and integrations with SAP and NetSuite. Worked with engineering across India, the US, and Europe, and with enterprise customers across North America, Europe, and APAC.",
    quote: "Complexity is not the enemy. Unexplained complexity is.",
  },
  {
    tag: "Hackathon",
    title: "EasyQueue — Healthcare Queuing for Walk-In Clinics",
    role: "PM + Builder · MBA Product Hackathon",
    body:
      "BC residents wait an average of 93 minutes in walk-in clinic waiting rooms - the longest average in Canada, with zero queue visibility after check-in. Our team of four built EasyQueue: a browser-based real-time queuing system with no app, no account, and no hardware. Full PM process from scratch in the MBA sprint: user interviews, patient surveys, ICP definition, and a north-star metric (reduction in Left Without Being Seen rate).",
    quote:
      "The moment a patient knows their position and approximate wait, they can make a decision. That decision-making power is what removes the distress.",
  },
  {
    tag: undefined,
    title: "Avalara — India GST Platform (0-to-1 Launch)",
    role: "Product Manager · Mar 2017 – Jun 2019",
    body:
      "Led the end-to-end launch of Avalara TrustFile GST during India's national GST rollout - roadmap definition, government API integrations (GSTN), validation workflows, filing systems, and go-to-market execution, with regulatory deadlines that don't move.",
    quote: "Regulatory deadlines don't negotiate. The only variable is how prepared you are.",
  },
];

function ExperienceRow({ job }: { job: (typeof experience)[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45 }}
      className="mb-5 rounded-xl p-6"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-1 gap-1">
        <div className="text-lg font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
          {job.company}
        </div>
        <div
          className="text-xs"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Courier New, monospace", whiteSpace: "nowrap" }}
        >
          {job.period}
          {job.type ? ` · ${job.type}` : ""}
        </div>
      </div>
      <div className="text-sm mb-1 font-medium" style={{ color: "#E8630A" }}>
        {job.role}
      </div>
      <div className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Courier New, monospace" }}>
        {job.location}
      </div>
      <ul className="space-y-2">
        {job.bullets.map((b, i) => (
          <li key={i} className="text-sm flex gap-2" style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }}>
            <span style={{ color: "#E8630A", flexShrink: 0 }}>▸</span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function CaseStudy({ item, index }: { item: (typeof caseStudies)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => {
    if (inView) track("work_case_study_viewed", { title: item.title });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const bgMap = ["#1A1A2E", "#0F2010", "#1A2A1A", "#2E1A0A"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      className="rounded-xl p-8 mb-6 relative"
      style={{ background: bgMap[index % bgMap.length], border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {item.tag && (
        <div
          className="absolute top-4 right-4 text-xs px-2 py-1 rounded font-medium uppercase tracking-wider"
          style={{ background: "rgba(232,99,10,0.2)", color: "#E8630A", fontFamily: "Courier New, monospace" }}
        >
          {item.tag}
        </div>
      )}
      <div className="mb-2 text-xs font-medium uppercase tracking-widest" style={{ color: "#E8630A" }}>
        {item.role}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
        {item.title}
      </h3>
      <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
        {item.body}
      </p>
      <blockquote
        className="italic font-medium border-l-4 pl-4 text-lg"
        style={{ color: "#E8630A", borderColor: "#E8630A" }}
      >
        &ldquo;{item.quote}&rdquo;
      </blockquote>
    </motion.div>
  );
}

function SkillCell({ text }: { text: string }) {
  return (
    <div
      className="text-sm py-2 px-3 rounded"
      style={{ background: "rgba(232,99,10,0.10)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(232,99,10,0.20)" }}
    >
      {text}
    </div>
  );
}

export default function WorkPage() {
  return (
    <div style={{ background: "#14131A", minHeight: "100vh" }}>
      <NavBar dark />

      {/* Hero */}
      <section className="py-20 px-4 max-w-3xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          style={{ fontFamily: "Georgia, serif", lineHeight: 1.25 }}
        >
          The problem I solve
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg"
          style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}
        >
          Financial infrastructure products are hard to own. They sit at the intersection of
          engineering complexity, regulatory constraint, and real business risk. A bad decision
          doesn&apos;t just slow down a sprint - it breaks a merchant&apos;s payday, triggers a
          compliance audit, or costs a customer their trust. I&apos;ve spent 8+ years owning exactly
          these products.
        </motion.p>
      </section>

      {/* Case studies */}
      <section className="py-8 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center" style={{ fontFamily: "Georgia, serif" }}>
          Selected work
        </h2>
        {caseStudies.map((c, i) => (
          <CaseStudy key={c.title} item={c} index={i} />
        ))}
      </section>

      {/* Full experience */}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center" style={{ fontFamily: "Georgia, serif" }}>
          Full experience
        </h2>
        {experience.map((job, i) => (
          <ExperienceRow key={`${job.company}-${i}`} job={job} />
        ))}
      </section>

      {/* Education */}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center" style={{ fontFamily: "Georgia, serif" }}>
          Education
        </h2>
        <div className="space-y-4">
          {[
            {
              degree: "Master of Business Administration (MBA)",
              detail: "Product Strategy, Technology Management & Data-Driven Decision Making",
              school: "University Canada West, Vancouver, BC",
              year: "Jul 2024 – Dec 2025",
            },
            {
              degree: "Bachelor of Commerce (BCom)",
              detail: "Savitribai Phule Pune University",
              school: "India",
              year: "",
            },
          ].map((edu) => (
            <div
              key={edu.degree}
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-1 gap-1">
                <div className="text-base font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
                  {edu.degree}
                </div>
                {edu.year && (
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Courier New, monospace" }}>
                    {edu.year}
                  </div>
                )}
              </div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                {edu.detail} · {edu.school}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center" style={{ fontFamily: "Georgia, serif" }}>
          Skills at a glance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "#E8630A" }}>
              Product
            </h3>
            <div className="flex flex-col gap-2">
              {skills.product.map((s) => (
                <SkillCell key={s} text={s} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "#E8630A" }}>
              Tools & Technical
            </h3>
            <div className="flex flex-col gap-2">
              {skills.technical.map((s) => (
                <SkillCell key={s} text={s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 max-w-3xl mx-auto text-center pb-contact">
        <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "Georgia, serif" }}>
          What I&apos;m looking for
        </h2>
        <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>
          A Senior PM role in fintech, legaltech, compliance, or platform infrastructure - somewhere
          I can own a complex domain, work closely with engineering, and build something that
          matters. Based in Vancouver, open to hybrid or remote across Canada.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <a
            href="mailto:harshadshinde@gmail.com"
            className="text-lg font-medium px-8 py-4 rounded-lg"
            style={{ background: "#E8630A", color: "white", textDecoration: "none" }}
            onClick={() => track("email_clicked", { source: "work_cta" })}
          >
            harshadshinde@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/harshadshindepm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-medium px-8 py-4 rounded-lg"
            style={{ background: "transparent", color: "white", border: "2px solid rgba(255,255,255,0.3)", textDecoration: "none" }}
            onClick={() => track("linkedin_clicked", { source: "work_cta" })}
          >
            linkedin.com/in/harshadshindepm
          </a>
        </div>
        <a
          href="https://topmate.io/harshadshindepm?utm_source=portfolio&utm_medium=work_cta"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline underline-offset-2"
          style={{ color: "rgba(255,255,255,0.55)" }}
          onClick={() => track("topmate_click", { source: "work_cta", service: "discovery_call" })}
        >
          Prefer to talk first? Book a free discovery call →
        </a>
      </section>

      <ContactBar />
    </div>
  );
}
