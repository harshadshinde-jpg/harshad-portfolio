"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValueEvent,
} from "framer-motion";
import BarbieBackground from "@/components/BarbieBackground";
import ContactBar from "@/components/ContactBar";
import DadJoke from "@/components/DadJoke";
import BackToDoors from "@/components/BackToDoors";
import { track } from "@/lib/posthog";

// ─── Experience data (accurate from resume) ───────────────────────────────────
const experience = [
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
    role: "Product Manager — Payments & Billing Platform",
    period: "Jul 2022 – Jun 2024",
    type: "Full-time",
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
    period: "Jan 2019 – Jun 2022",
    type: "Full-time",
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
    period: "Mar 2017 – Jun 2019",
    type: "Full-time",
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
    period: "Jul 2015 – Feb 2017",
    type: "Freelance",
    location: "India",
    bullets: [
      "Provided domain expertise on Indian tax compliance, informing early product roadmap decisions, integration architecture, and workflow design for Avalara's market entry.",
    ],
  },
];

// ─── Skills data ──────────────────────────────────────────────────────────────
const skills = {
  product: [
    "Payments infrastructure & recurring billing",
    "Tax compliance & regulatory systems",
    "ERP integrations — SAP, NetSuite, EDI",
    "Cross-border commerce & multi-jurisdiction tax",
    "Platform migrations — TSYS → Stripe",
    "0-to-1 product launches",
    "Roadmapping & data-driven prioritisation",
    "Stakeholder alignment across eng, finance, legal",
    "User research, discovery & problem framing",
    "Go-to-market for complex B2B financial products",
    "Enterprise customer engagement (NA, EU, APAC)",
  ],
  technical: [
    "Jira · Confluence · Linear",
    "SQL & product analytics",
    "REST APIs · Stripe APIs · GSTN APIs",
    "ERP/EDI integrations (SAP, NetSuite)",
    "React prototyping (AI-assisted, Claude)",
    "Figma · Miro",
    "Agile/Scrum · OKRs · User Story Mapping",
    "A/B Testing · PostHog · Amplitude",
    "Technical documentation & acceptance criteria",
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function StoryCard({
  title,
  role,
  body,
  quote,
  index,
  tag,
}: {
  title: string;
  role: string;
  body: string;
  quote: string;
  index: number;
  tag?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => {
    if (inView) track("journey_1_section_viewed", { section: `card_${index}` });
  }, [inView, index]);

  const bgMap = ["#1A1A2E", "#0F2010", "#1A2A1A", "#2E1A0A"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="rounded-xl p-8 mb-8 relative"
      style={{
        background: bgMap[index % bgMap.length],
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {tag && (
        <div
          className="absolute top-4 right-4 text-xs px-2 py-1 rounded font-medium uppercase tracking-wider"
          style={{ background: "rgba(232,99,10,0.2)", color: "#E8630A", fontFamily: "Courier New, monospace" }}
        >
          {tag}
        </div>
      )}
      <div className="mb-2 text-xs font-medium uppercase tracking-widest" style={{ color: "#E8630A" }}>
        {role}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
        {title}
      </h3>
      <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
        {body}
      </p>
      <motion.blockquote
        initial={{ fontSize: "0.85rem" }}
        animate={inView ? { fontSize: "1.2rem" } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="italic font-medium border-l-4 pl-4"
        style={{ color: "#E8630A", borderColor: "#E8630A" }}
      >
        &ldquo;{quote}&rdquo;
      </motion.blockquote>
    </motion.div>
  );
}

function ExperienceCard({ job }: { job: (typeof experience)[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-6 rounded-xl p-6"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-1 gap-1">
        <div className="text-lg font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
          {job.company}
        </div>
        <div
          className="text-xs"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Courier New, monospace", whiteSpace: "nowrap" }}
        >
          {job.period} · {job.type}
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
          <li key={i} className="text-sm flex gap-2" style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
            <span style={{ color: "#E8630A", flexShrink: 0 }}>▸</span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function SkillCell({ text, delay }: { text: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.25, delay }}
      className="text-sm py-2 px-3 rounded"
      style={{
        background: "rgba(232,99,10,0.10)",
        color: "rgba(255,255,255,0.85)",
        border: "1px solid rgba(232,99,10,0.20)",
      }}
    >
      {text}
    </motion.div>
  );
}

// ─── Persistent side scroll-hints ────────────────────────────────────────────
function ScrollHints({ visible }: { visible: boolean }) {
  return (
    <>
      {[4, "right-4"].map((pos, side) => (
        <motion.div
          key={side}
          className={`fixed ${side === 0 ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 z-50 pointer-events-none flex flex-col items-center gap-1`}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: side * 0.3 }}
            className="text-2xl"
            style={{ color: "#E8630A" }}
          >
            ↓
          </motion.div>
          <span
            className="text-xs uppercase tracking-widest"
            style={{
              color: "rgba(232,99,10,0.6)",
              writingMode: "vertical-rl",
              fontFamily: "Courier New, monospace",
            }}
          >
            scroll
          </span>
        </motion.div>
      ))}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HirerPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const barbieTransform = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [barbieProgress, setBarbieProgress] = useState(0);
  useMotionValueEvent(barbieTransform, "change", (v) => setBarbieProgress(v));

  const [showHints, setShowHints] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShowHints(v > 0.06 && v < 0.92);
  });

  const ctaInView = useInView(ctaRef, { once: true });
  useEffect(() => {
    if (ctaInView) track("journey_1_completed");
  }, [ctaInView]);

  const heroLineY = useTransform(scrollYProgress, [0, 0.1], [0, -30]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div ref={containerRef} style={{ background: "#0D0D0D", minHeight: "100vh" }}>
      <BarbieBackground progress={barbieProgress} />
      <ScrollHints visible={showHints} />

      {/* ── Section 1 — Hero ── */}
      <section
        className="sticky top-0 flex items-center justify-center min-h-screen z-10 px-4"
        style={{ background: "#0D0D0D" }}
      >
        <motion.div style={{ y: heroLineY, opacity: heroOpacity }} className="text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "Georgia, serif", lineHeight: 1.2 }}
          >
            Let&apos;s make this worth
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: "Georgia, serif", color: "#E8630A", lineHeight: 1.2 }}
          >
            your time.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            You&apos;re evaluating whether I&apos;m worth a conversation. I respect that.
            <br />Here&apos;s what you need to know, without the noise.
          </motion.p>
          {/* Blinking ↓ — consistent, stays visible while hero is on screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-12 text-3xl"
            style={{ color: "#E8630A" }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* ── Scrollable content ── */}
      <div className="relative z-20" style={{ background: "#0D0D0D" }}>

        {/* ── Section 2 — Problem ── */}
        <section className="py-24 px-4 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              onViewportEnter={() => track("journey_1_section_viewed", { section: "problem" })}
            >
              <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "Georgia, serif" }}>
                The problem I solve
              </h2>
              <p className="text-base mb-4" style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
                Financial infrastructure products are hard to own. They sit at the intersection of
                engineering complexity, regulatory constraint, and real business risk. A bad decision
                doesn&apos;t just slow down a sprint — it breaks a merchant&apos;s payday, triggers a
                compliance audit, or costs a customer their trust.
              </p>
              <p className="text-base" style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
                I&apos;ve spent 8+ years owning exactly these products — payments platforms, recurring
                billing, cross-border tax compliance, ERP integrations, 0-to-1 launches. I know what it
                means to ship something that handles real money for real businesses, and I know what it
                costs when it goes wrong.
              </p>
              <p className="text-base mt-4 font-medium" style={{ color: "#E8630A" }}>
                I&apos;m also someone who builds working prototypes to show you what I mean, instead
                of just describing it.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center text-6xl"
                style={{ background: "rgba(232,99,10,0.10)", border: "2px solid rgba(232,99,10,0.30)" }}
              >
                ⚙️
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Section 3 — Story Cards ── */}
        <section className="py-12 px-4 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-8 text-center"
            style={{ fontFamily: "Georgia, serif" }}
          >
            The work that defines me
          </motion.h2>

          <StoryCard
            index={0}
            title="Mindbody — Payments Platform & TSYS→Stripe Migration"
            role="Product Manager, Payments & Billing · Jul 2022 – Jun 2024"
            body="I owned the payments, billing, and POS platform for 1,800+ wellness businesses globally. My headline project was leading the migration from TSYS to Stripe: a high-stakes, zero-downtime transition with live merchants on one side, revenue on the line, and six months of engineering complexity throughout. This wasn't just a technical lift — it was a product problem. Merchant communication, rollback planning, billing logic reconciliation, dispute flow redesign, failure scenario mapping. Every decision had a downstream consequence I had to own."
            quote="The best payment experience is the one nobody notices."
          />

          <StoryCard
            index={1}
            title="Avalara — Cross-Border Tax Compliance & ERP Integrations"
            role="Product Manager, Compliance · Jan 2019 – Jun 2022"
            body="At Avalara, I owned products at the intersection of global commerce and regulatory complexity. Multi-jurisdiction tax rules, cross-border duty calculation, integrations with SAP and NetSuite — the kind of domain where a missed edge case has real compliance consequences for real finance teams. I worked with engineering teams across India, the US, and Europe, and with enterprise customers in North America, Europe, and APAC. I built deep expertise in how enterprise financial systems move data, where they break, and what it takes to ship compliance products that businesses trust with real money."
            quote="Complexity is not the enemy. Unexplained complexity is."
          />

          <StoryCard
            index={2}
            title="EasyQueue — Healthcare Queuing for Walk-In Clinics"
            role="PM + Builder · MBA Product Hackathon"
            tag="Hackathon"
            body="BC residents wait an average of 93 minutes in walk-in clinic waiting rooms — the longest average in Canada. After check-in, patients get nothing: no queue position, no estimate, no agency. Front desk MOAs lose 20–33% of peak shift answering 'how long?' — questions they can't actually answer accurately. Our team of four built EasyQueue: a browser-based real-time queuing system requiring no app, no account, no hardware. Patients get a token link at check-in; the ETA page auto-refreshes. Staff get a simple dashboard. No change to existing workflows. North Star: reduction in Left Without Being Seen (LWBS) rate. The full product process — user interviews, patient surveys, ICP definition, assumptions mapping, persona development — was built from scratch in the MBA sprint."
            quote="The moment a patient knows their position and approximate wait, they can make a decision. That decision-making power is what removes the distress — not the duration itself."
          />

          <StoryCard
            index={3}
            title="Avalara — India GST Platform (0-to-1 Launch)"
            role="Product Manager · Mar 2017 – Jun 2019"
            body="During India's national GST rollout, I led the end-to-end launch of Avalara TrustFile GST from concept to market. This was a 0-to-1 product — owning roadmap definition, requirements, government API integrations (GSTN), validation workflows, filing systems, and go-to-market execution. I acquired first customers and iterated post-launch on adoption data. Building a compliance product during a national tax system transition, with regulatory deadlines that don't move, is a different kind of pressure."
            quote="Regulatory deadlines don't negotiate. The only variable is how prepared you are."
          />

          <StoryCard
            index={4}
            title="ProductBC Build-a-thon — Prototype Shipped from Scratch"
            role="PM + Builder"
            body="During the ProductBC Build-a-thon, I did something most PMs don't do: I built the prototype myself. I defined the problem, ran user interviews, and shipped a working React application using Claude as a coding collaborator. This site was built the same way — every page, every interaction, every animation."
            quote="The gap between product thinking and engineering is smaller than anyone told me."
          />
        </section>

        {/* ── Section 4 — Full Experience ── */}
        <section className="py-12 px-4 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-8 text-center"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Full experience
          </motion.h2>
          {experience.map((job, i) => (
            <ExperienceCard key={`${job.company}-${i}`} job={job} />
          ))}
        </section>

        {/* ── Section 5 — Education ── */}
        <section className="py-12 px-4 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-6 text-center"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Education
          </motion.h2>
          <div className="space-y-4">
            {[
              {
                degree: "Master of Business Administration (MBA)",
                detail: "Product Strategy, Technology Management & Data-Driven Decision Making",
                school: "Vancouver, BC",
                year: "Dec 2025",
              },
              {
                degree: "Bachelor of Commerce (BCom)",
                detail: "Savitribai Phule Pune University",
                school: "India",
                year: "",
              },
            ].map((edu) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Section 6 — Skills ── */}
        <section className="py-12 px-4 max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-8 text-center"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Skills at a glance
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "#E8630A" }}>
                Product
              </h3>
              <div className="flex flex-col gap-2">
                {skills.product.map((s, i) => (
                  <SkillCell key={s} text={s} delay={i * 0.03} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "#E8630A" }}>
                Tools & Technical
              </h3>
              <div className="flex flex-col gap-2">
                {skills.technical.map((s, i) => (
                  <SkillCell key={s} text={s} delay={i * 0.03 + 0.3} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 7 — CTA ── */}
        <section ref={ctaRef} className="py-24 px-4 max-w-3xl mx-auto text-center pb-contact">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "Georgia, serif" }}>
              What I&apos;m looking for
            </h2>
            <p className="text-lg mb-12" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>
              A Senior PM role in fintech, legaltech, compliance, or platform infrastructure — somewhere
              I can own a complex domain, work closely with engineering, and build something that matters.
              Based in Vancouver. Open to hybrid or remote across Canada.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                href="mailto:harshadshinde@gmail.com"
                className="heartbeat text-lg font-medium px-8 py-4 rounded-lg"
                style={{ background: "#E8630A", color: "white", textDecoration: "none" }}
                whileHover={{ scale: 1.04 }}
              >
                harshadshinde@gmail.com
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/harshadshindepm"
                target="_blank"
                rel="noopener noreferrer"
                className="heartbeat text-lg font-medium px-8 py-4 rounded-lg"
                style={{
                  background: "transparent",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.3)",
                  textDecoration: "none",
                }}
                whileHover={{ scale: 1.04, borderColor: "#E8630A" }}
              >
                linkedin.com/in/harshadshindepm
              </motion.a>
            </div>

            <div className="mt-12">
              <BackToDoors />
            </div>
          </motion.div>

          <DadJoke />
        </section>
      </div>

      <ContactBar />
    </div>
  );
}
