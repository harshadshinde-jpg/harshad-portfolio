"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactBar from "@/components/ContactBar";
import DadJoke from "@/components/DadJoke";
import BackToDoors from "@/components/BackToDoors";
import { useSounds } from "@/components/SoundManager";
import { track } from "@/lib/posthog";

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = "discovery" | "board";
type ColIndex = 0 | 1 | 2 | 3 | 4;

// ─── Column metadata ──────────────────────────────────────────────────────────
const COLUMNS = [
  { id: "discovery", label: "Discovery", icon: "🔍" },
  { id: "research",  label: "Research",  icon: "👥" },
  { id: "build",     label: "Build",     icon: "📋" },
  { id: "ship",      label: "Ship",      icon: "🚀" },
  { id: "connect",   label: "Connect",   icon: "☕" },
] as const;

// ─── Discovery column ─────────────────────────────────────────────────────────
function DiscoveryContent({ isLarge }: { isLarge: boolean }) {
  return (
    <div className={`flex flex-col gap-4 ${isLarge ? "items-center" : "items-start"}`}>
      <div
        className="rounded-lg p-4 w-full"
        style={{ background: "#f5f0d0", maxWidth: isLarge ? undefined : 280 }}
      >
        <div
          className="text-sm font-bold mb-1"
          style={{ color: "#666", fontFamily: "var(--font-caveat), cursive" }}
        >
          The question I started with
        </div>
        <p
          className="font-medium"
          style={{
            fontFamily: "var(--font-caveat), cursive",
            fontSize: isLarge ? "1.3rem" : "1rem",
            color: "#333",
            lineHeight: 1.5,
          }}
        >
          How might I help the right engineering-led, financially complex product team
          find their next Senior PM — and recognise that it&apos;s me?
        </p>
      </div>
      <div
        className="rounded-lg p-3 w-full text-sm"
        style={{ background: "rgba(232,99,10,0.08)", border: "1px solid rgba(232,99,10,0.2)", color: "#333" }}
      >
        <span className="font-semibold" style={{ color: "#E8630A" }}>Constraints: </span>
        No recruiter agency. No spray-and-pray applications. Build something that filters
        for the right audience before they even book a call.
      </div>
    </div>
  );
}

// ─── Research column ──────────────────────────────────────────────────────────
const personas = [
  {
    emoji: "👔",
    door: "The Hiring Manager",
    jtbd: "Find a Senior PM who can own complexity without hand-holding.",
    fear: "PMs who can't have a real conversation with an engineer.",
    want: "Evidence of thinking. Proof of technical credibility. A prototype, ideally.",
    color: "#EEF1FF",
    border: "#C0CAFF",
  },
  {
    emoji: "🧠",
    door: "The Fellow PM",
    jtbd: "Steal ideas, get inspired, maybe grab a coffee.",
    fear: "Generic PM-speak with no substance behind it.",
    want: "Someone who gets the craft. Real talk, no buzzword bingo.",
    color: "#EDFAED",
    border: "#A0D8A0",
  },
  {
    emoji: "👋",
    door: "The Friend",
    jtbd: "Catch up. See what Harshad's actually been up to.",
    fear: "A LinkedIn-ified version of someone they actually know.",
    want: "Personal touch. The real story, not the polished pitch.",
    color: "#FFF5EC",
    border: "#F0C090",
  },
  {
    emoji: "🌀",
    door: "The Curious One",
    jtbd: "Explore something unexpected they stumbled upon.",
    fear: "A boring site that wastes their time.",
    want: "Something surprising. An easter egg. A reason to stay.",
    color: "#F5F0FF",
    border: "#C0A8FF",
  },
];

function ResearchContent() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs mb-1" style={{ color: "rgba(0,0,0,0.45)", fontFamily: "Courier New, monospace" }}>
        The 4 doors = 4 user segments. Each with a different JTBD.
      </p>
      {personas.map((p, i) => (
        <motion.div
          key={i}
          layout
          onClick={() => setExpanded(expanded === i ? null : i)}
          className="rounded-lg p-3 cursor-pointer"
          style={{ background: p.color, border: `1.5px solid ${p.border}` }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">{p.emoji}</span>
            <span className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>
              {p.door}
            </span>
            <span className="ml-auto text-xs" style={{ color: "#888" }}>
              {expanded === i ? "▲" : "▼"}
            </span>
          </div>
          <AnimatePresence>
            {expanded === i && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 overflow-hidden"
              >
                <p className="text-xs mb-1" style={{ color: "#444" }}>
                  <span className="font-semibold">Job-to-be-done:</span> {p.jtbd}
                </p>
                <p className="text-xs mb-1" style={{ color: "#444" }}>
                  <span className="font-semibold">Fear:</span> {p.fear}
                </p>
                <p className="text-xs" style={{ color: "#444" }}>
                  <span className="font-semibold">Wants:</span> {p.want}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Build column ─────────────────────────────────────────────────────────────
function BuildContent() {
  const phases = [
    {
      phase: "Now",
      label: "Foundation",
      cards: ["Get positioning right", "Tell the story once", "Make it findable", "(This website.)"],
      color: "#E8630A",
    },
    {
      phase: "Soon",
      label: "Activation",
      cards: ["Apply selectively at 75%+ match", "Use prototyping as opener", "Target eng-valued orgs"],
      color: "#888888",
    },
    {
      phase: "Later",
      label: "Iteration",
      cards: ["New chapters as story evolves", "Next job = next case study"],
      color: "#AAAACC",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div
        className="rounded p-2 text-center text-xs"
        style={{ background: "rgba(232,99,10,0.08)", color: "#E8630A", fontFamily: "Courier New, monospace" }}
      >
        📌 This is a real roadmap.
      </div>
      <div className="flex gap-3">
        {phases.map((p) => (
          <div key={p.phase} className="flex-1">
            <div
              className="text-xs font-bold uppercase tracking-widest mb-2 px-2 py-1 rounded text-center"
              style={{ background: p.color, color: "white" }}
            >
              {p.phase}
            </div>
            {p.cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded p-2 mb-2 text-xs"
                style={{ background: "#f5f0d0", color: "#333" }}
              >
                {card}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Ship column ──────────────────────────────────────────────────────────────
function ShipContent() {
  const lines = [
    "> npm run build",
    "✓ Compiled successfully",
    "> Deploying to Vercel...",
    "✓ Routes: / /hirer /pm /friend /void /base",
    "✓ API: /api/coffee-chat /api/idea",
    "✓ Posthog analytics: enabled",
    "✓ Sound system: ready",
    "✓ Barbie: present",
    "> Build complete. 🚀",
  ];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown < lines.length) {
      const t = setTimeout(() => setShown((s) => s + 1), 380);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  const done = shown >= lines.length;

  return (
    <div className="flex flex-col gap-3">
      <div
        className="rounded-lg p-3 font-terminal text-sm"
        style={{ background: "#0a0a0a", border: "1px solid rgba(0,255,65,0.2)", minHeight: 180 }}
      >
        {lines.slice(0, shown).map((line, i) => (
          <div key={i} style={{ color: i === shown - 1 ? "#00FF41" : "rgba(0,255,65,0.55)" }}>
            {line}
          </div>
        ))}
        {!done && <span className="cursor-blink" style={{ color: "#00FF41" }}>█</span>}
      </div>
      {done && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2"
        >
          <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: "rgba(232,99,10,0.15)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full"
              style={{ background: "#E8630A" }}
            />
          </div>
          <p className="text-xs text-center font-medium" style={{ color: "#E8630A" }}>
            Live at harshad.world
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ─── Connect column ───────────────────────────────────────────────────────────
function ConnectContent() {
  const [form, setForm] = useState({ name: "", what: "", email: "", time: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/coffee-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) track("journey_2_form_submitted");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="text-4xl mb-4">☕</div>
        <p className="font-medium text-lg" style={{ color: "#1A1A1A" }}>Sent.</p>
        <p style={{ color: "#666" }}>I&apos;ll find a time and write back.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {[
        { key: "name", label: "Your name", placeholder: "What do I call you?" },
        { key: "what", label: "What you're working on", placeholder: "One line is fine" },
        { key: "email", label: "Your email", placeholder: "So I can write back" },
      ].map((field) => (
        <div
          key={field.key}
          className="rounded-lg p-3"
          style={{ background: "#f5f0d0" }}
        >
          <label
            className="block text-xs font-medium mb-1"
            style={{ color: "#666", fontFamily: "var(--font-caveat), cursive" }}
          >
            {field.label}
          </label>
          <input
            type={field.key === "email" ? "email" : "text"}
            placeholder={field.placeholder}
            required
            value={form[field.key as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
            className="w-full text-sm bg-transparent outline-none"
            style={{ color: "#333", fontFamily: "var(--font-caveat), cursive", fontSize: "1rem" }}
          />
        </div>
      ))}
      <div className="rounded-lg p-3" style={{ background: "#f5f0d0" }}>
        <label
          className="block text-xs font-medium mb-1"
          style={{ color: "#666", fontFamily: "var(--font-caveat), cursive" }}
        >
          Preferred time
        </label>
        <div className="flex flex-col gap-2">
          {["Weekday evening (after 6pm PT)", "Weekend afternoon"].map((opt) => (
            <label key={opt} className="flex items-center gap-1 text-xs cursor-pointer" style={{ color: "#333" }}>
              <input
                type="radio"
                name="time"
                value={opt}
                checked={form.time === opt}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 font-medium text-white rounded transition-all hover:scale-105 active:scale-95"
        style={{ background: "#E8630A" }}
      >
        📌 {status === "sending" ? "Sending..." : "Pin it — send request"}
      </button>
      {status === "error" && (
        <p className="text-center text-xs" style={{ color: "#cc3333" }}>
          Something went wrong. Email harshadshinde@gmail.com directly.
        </p>
      )}
    </form>
  );
}

// ─── Kanban column wrapper ────────────────────────────────────────────────────
function KanbanColumn({
  index,
  active,
  onActivate,
}: {
  index: ColIndex;
  active: boolean;
  onActivate: () => void;
}) {
  const col = COLUMNS[index];

  const contentMap: Record<number, React.ReactNode> = {
    0: <DiscoveryContent isLarge={false} />,
    1: <ResearchContent />,
    2: <BuildContent />,
    3: <ShipContent />,
    4: <ConnectContent />,
  };

  return (
    <div
      className="flex flex-col h-full rounded-xl overflow-hidden transition-all"
      style={{
        border: active
          ? "2px solid #E8630A"
          : "1.5px solid rgba(0,0,0,0.10)",
        minWidth: active ? "min(420px, 90vw)" : 200,
        maxWidth: active ? "min(420px, 90vw)" : 220,
        background: active ? "#FFFFFF" : "#F4F3EF",
        flexShrink: 0,
        cursor: active ? "default" : "pointer",
        boxShadow: active ? "0 4px 24px rgba(232,99,10,0.12)" : "none",
      }}
      onClick={active ? undefined : onActivate}
    >
      {/* Column header */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          background: active ? "#E8630A" : "rgba(0,0,0,0.04)",
          borderBottom: active ? "none" : "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <span className="text-base">{col.icon}</span>
        <span
          className="text-sm font-semibold"
          style={{ color: active ? "white" : "#333" }}
        >
          {col.label}
        </span>
        {!active && (
          <span className="ml-auto text-xs" style={{ color: "#aaa" }}>
            click →
          </span>
        )}
      </div>

      {/* Column body */}
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto p-4"
        >
          {contentMap[index]}
        </motion.div>
      )}
    </div>
  );
}

// ─── Discovery Phase ──────────────────────────────────────────────────────────
function DiscoveryPhase({ onEnterBoard }: { onEnterBoard: () => void }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 px-4">
      <div className="text-center">
        <h1
          className="text-2xl md:text-3xl font-bold mb-2"
          style={{ fontFamily: "Georgia, serif", color: "#1A1A1A" }}
        >
          Fellow PM?
        </h1>
        <p className="text-base" style={{ color: "#666" }}>
          This portfolio is itself a PM exercise. Let me show you the process.
        </p>
      </div>

      {/* Large discovery card — 40%+ of the screen */}
      <div style={{ perspective: "1000px", width: "min(480px, 90vw)" }}>
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            transformStyle: "preserve-3d",
            width: "100%",
            height: "clamp(220px, 45vh, 360px)",
            cursor: flipped ? "default" : "pointer",
            position: "relative",
          }}
          onClick={() => {
            if (!flipped) {
              setFlipped(true);
              track("journey_2_discovery_flipped");
            }
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl gap-4"
            style={{
              backfaceVisibility: "hidden",
              background: "#f5f0d0",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              border: "2px solid rgba(0,0,0,0.06)",
            }}
          >
            <span className="text-6xl">📋</span>
            <p
              className="text-lg font-medium"
              style={{ fontFamily: "var(--font-caveat), cursive", color: "#666" }}
            >
              Click to reveal the problem
            </p>
            <p className="text-sm" style={{ color: "#aaa" }}>
              (Every PM story starts here.)
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl p-8 flex flex-col justify-center"
            style={{
              backfaceVisibility: "hidden",
              background: "#f5f0d0",
              transform: "rotateY(180deg)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <div
              className="text-sm font-bold mb-3 uppercase tracking-widest"
              style={{ color: "#E8630A" }}
            >
              Discovery — HMW
            </div>
            <p
              className="font-medium leading-relaxed"
              style={{
                fontFamily: "var(--font-caveat), cursive",
                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                color: "#222",
              }}
            >
              How might I help the right engineering-led, financially complex product team
              find their next Senior PM — and recognise that it&apos;s me?
            </p>
          </div>
        </motion.div>
      </div>

      {/* CTA after flip */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="text-sm text-center" style={{ color: "#666" }}>
              Now see how I solved it — the full PM process, in a kanban board.
            </p>
            <motion.button
              onClick={onEnterBoard}
              className="px-8 py-3 rounded-lg font-semibold text-white"
              style={{ background: "#E8630A" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Enter the board →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main PMPage ──────────────────────────────────────────────────────────────
export default function PMPage() {
  const [phase, setPhase] = useState<Phase>("discovery");
  const [activeCol, setActiveCol] = useState<ColIndex>(0);
  const { play } = useSounds();

  const goTo = (i: ColIndex) => {
    play("click");
    setActiveCol(i);
    track("journey_2_column_reached", { column: COLUMNS[i].id });
  };

  // Keyboard navigation
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (phase !== "board") return;
      if (e.key === "ArrowRight" && activeCol < 4) goTo((activeCol + 1) as ColIndex);
      if (e.key === "ArrowLeft" && activeCol > 0) goTo((activeCol - 1) as ColIndex);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, activeCol]);

  return (
    <div
      className="h-screen overflow-hidden relative flex flex-col"
      style={{ background: "#F8F7F2" }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-4 py-3 z-20 relative"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", background: "#F8F7F2" }}
      >
        <div>
          <span
            className="text-lg font-bold"
            style={{ fontFamily: "Georgia, serif", color: "#1A1A1A" }}
          >
            PM View
          </span>
          {phase === "board" && (
            <span
              className="ml-2 text-xs uppercase tracking-widest"
              style={{ color: "#888", fontFamily: "Courier New, monospace" }}
            >
              — {COLUMNS[activeCol].label}
            </span>
          )}
        </div>
        <BackToDoors variant="handwritten" />
      </div>

      {/* ── Discovery phase ── */}
      {phase === "discovery" && (
        <div className="flex-1 overflow-hidden">
          <DiscoveryPhase onEnterBoard={() => { setPhase("board"); track("journey_2_board_entered"); }} />
        </div>
      )}

      {/* ── Kanban board phase ── */}
      {phase === "board" && (
        <>
          {/* Column tab strip */}
          <div
            className="flex items-center gap-1 px-4 py-2 overflow-x-auto z-20 relative"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", background: "#F0EFE9" }}
          >
            {COLUMNS.map((col, i) => (
              <button
                key={col.id}
                onClick={() => goTo(i as ColIndex)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: activeCol === i ? "#E8630A" : "transparent",
                  color: activeCol === i ? "white" : "#555",
                  border: activeCol === i ? "none" : "1px solid rgba(0,0,0,0.12)",
                }}
              >
                <span>{col.icon}</span>
                <span>{col.label}</span>
              </button>
            ))}
          </div>

          {/* Kanban board — all columns visible, active one is wider */}
          <div className="flex-1 overflow-hidden">
            <div
              className="flex gap-3 h-full px-4 py-4 overflow-x-auto"
              style={{ alignItems: "stretch" }}
            >
              {COLUMNS.map((_, i) => (
                <KanbanColumn
                  key={i}
                  index={i as ColIndex}
                  active={activeCol === i}
                  onActivate={() => goTo(i as ColIndex)}
                />
              ))}
            </div>
          </div>

          {/* Bottom nav */}
          <div
            className="flex items-center justify-between px-4 py-2 z-20 relative"
            style={{ borderTop: "1px solid rgba(0,0,0,0.08)", background: "#F8F7F2" }}
          >
            <button
              onClick={() => activeCol > 0 && goTo((activeCol - 1) as ColIndex)}
              disabled={activeCol === 0}
              className="px-4 py-2 rounded text-sm font-medium transition-all hover:scale-105 disabled:opacity-30"
              style={{ background: "rgba(0,0,0,0.06)", color: "#333" }}
            >
              ← Prev
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {COLUMNS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i as ColIndex)}
                  className="rounded-full transition-all"
                  style={{
                    width: activeCol === i ? 20 : 8,
                    height: 8,
                    background: activeCol === i ? "#E8630A" : "rgba(0,0,0,0.15)",
                    border: "none",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            {activeCol === 4 ? (
              <BackToDoors variant="handwritten" />
            ) : (
              <button
                onClick={() => goTo((activeCol + 1) as ColIndex)}
                className="px-4 py-2 rounded text-sm font-medium text-white transition-all hover:scale-105"
                style={{ background: "#E8630A" }}
              >
                Next →
              </button>
            )}
          </div>

          {activeCol === 4 && (
            <div className="text-center pb-2 z-20 relative">
              <DadJoke />
            </div>
          )}
        </>
      )}

      <ContactBar />
    </div>
  );
}
