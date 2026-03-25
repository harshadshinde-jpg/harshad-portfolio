"use client";

import { useEffect } from "react";
import Link from "next/link";
import { track } from "@/lib/posthog";

export default function BasePage() {
  useEffect(() => {
    track("easter_egg_found", { source: "base_layer" });
  }, []);

  return (
    <div className="min-h-screen py-16 px-6" style={{ background: "#ffffff" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div
          className="mb-12 pb-6"
          style={{ borderBottom: "2px solid #171717" }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "#999999", fontFamily: "Courier New, monospace" }}
          >
            You found the base layer.
          </p>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "Georgia, serif", color: "#171717" }}
          >
            This is the version without the UX.
          </h1>
          <p style={{ color: "#555555", lineHeight: 1.7 }}>
            No persona. No journey. No carefully designed narrative arc. Just everything, in order, as
            it actually is. You got here because you were curious enough to look. That&apos;s the right
            instinct.
          </p>
        </div>

        {/* Full story */}
        <section className="mb-10">
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "Georgia, serif", color: "#171717" }}
          >
            The full story, unfiltered
          </h2>
          <p className="mb-4" style={{ color: "#333333", lineHeight: 1.8 }}>
            My name is Harshad Shinde. Senior Product Manager. Coquitlam, BC. 8+ years in financial
            infrastructure — payments, billing, tax compliance, ERP integrations. Avalara. Mindbody.
            PavePal. MBA in Vancouver. And lately, someone who builds his own prototypes in React using
            Claude as a coding collaborator.
          </p>
          <p style={{ color: "#333333", lineHeight: 1.8 }}>
            This website is also a prototype. Built the same way.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-10">
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "Georgia, serif", color: "#171717" }}
          >
            Experience
          </h2>

          {[
            {
              company: "Mindbody",
              role: "Senior Product Manager, Payments & Billing",
              bullets: [
                "End-to-end ownership of payments and billing platform for tens of thousands of wellness businesses globally",
                "Led TSYS → Stripe migration: zero-downtime, full merchant communication, rollback planning",
                "Billing logic reconciliation, failure scenario mapping, cross-functional execution",
              ],
            },
            {
              company: "Avalara",
              role: "Product Manager, Tax Compliance",
              bullets: [
                "Multi-jurisdiction tax rules, cross-border edge cases, SAP & NetSuite integrations",
                "Built compliance products that enterprise finance teams trusted with real money",
                "Deep expertise in enterprise financial system data flows and failure modes",
              ],
            },
            {
              company: "PavePal",
              role: "Product Manager",
              bullets: [
                "Early-stage fintech product work",
                "Payments and financial infrastructure domain",
              ],
            },
          ].map((job) => (
            <div key={job.company} className="mb-6">
              <div
                className="font-bold text-base"
                style={{ color: "#171717", fontFamily: "Georgia, serif" }}
              >
                {job.company}
              </div>
              <div className="text-sm mb-2" style={{ color: "#E8630A" }}>
                {job.role}
              </div>
              <ul className="list-disc list-inside space-y-1">
                {job.bullets.map((b, i) => (
                  <li key={i} className="text-sm" style={{ color: "#444444", lineHeight: 1.7 }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-10">
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "Georgia, serif", color: "#171717" }}
          >
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Payments platforms & recurring billing",
              "Tax compliance & regulatory products",
              "ERP integrations — SAP, NetSuite",
              "Cross-border commerce",
              "Platform migrations (TSYS → Stripe)",
              "Roadmapping & prioritisation",
              "Stakeholder alignment",
              "User research & discovery",
              "MBA — Technology Management",
              "React prototyping",
              "AI-assisted development (Claude)",
              "Figma",
              "SQL basics",
              "Vercel deployments",
            ].map((skill) => (
              <div
                key={skill}
                className="text-sm py-1 px-2 rounded"
                style={{ background: "#f5f5f5", color: "#333333" }}
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Meta layer */}
        <section className="mb-10">
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "Georgia, serif", color: "#171717" }}
          >
            The meta-layer
          </h2>
          <p className="mb-3" style={{ color: "#333333", lineHeight: 1.8 }}>
            This portfolio is itself a demonstration of product thinking. Four distinct personas.
            Different journeys for different jobs-to-be-done. A working product to tell my own story.
            AI as a collaborator to ship it.
          </p>
          <p className="mb-3" style={{ color: "#333333", lineHeight: 1.8 }}>
            The best PM doesn&apos;t just describe the product. They are the product.
          </p>
          <p className="font-medium" style={{ color: "#171717" }}>
            This entire website is a PM portfolio. The product is the PM. The user research was the
            four doors. You just participated in it.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "Georgia, serif", color: "#171717" }}
          >
            Contact
          </h2>
          <div className="space-y-2">
            <div>
              <a
                href="mailto:harshadshinde@gmail.com"
                className="text-base hover:underline"
                style={{ color: "#E8630A" }}
              >
                harshadshinde@gmail.com
              </a>
            </div>
            <div>
              <a
                href="https://linkedin.com/in/harshadshindepm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base hover:underline"
                style={{ color: "#E8630A" }}
              >
                linkedin.com/in/harshadshindepm
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/harshdotca/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base hover:underline"
                style={{ color: "#E8630A" }}
              >
                instagram.com/harshdotca
              </a>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div
          className="pt-6"
          style={{ borderTop: "1px solid #eeeeee" }}
        >
          <Link
            href="/"
            className="text-sm hover:underline"
            style={{ color: "#999999" }}
          >
            ← Back to the experiment
          </Link>
        </div>

        {/* Meta joke at very bottom */}
        <p
          className="mt-16 text-xs italic text-center"
          style={{ color: "#cccccc" }}
        >
          Why did the scarecrow win an award? Because he was outstanding in his field. (Much like this
          base layer, hidden in plain sight.)
        </p>
      </div>
    </div>
  );
}
