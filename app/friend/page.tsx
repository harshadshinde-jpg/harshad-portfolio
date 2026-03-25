"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ContactBar from "@/components/ContactBar";
import DadJoke from "@/components/DadJoke";
import BackToDoors from "@/components/BackToDoors";
import { useSounds } from "@/components/SoundManager";
import { track } from "@/lib/posthog";

// ─── Card data ────────────────────────────────────────────────────────────────
interface CardData {
  id: number;
  type: "barbie" | "story" | "polaroid";
  chapter?: string;
  title?: string;
  body?: string;
  quote?: string;
  bg?: string;
  doodle?: string;
  instaHandle?: string;
}

const cards: CardData[] = [
  { id: 0, type: "barbie" },
  {
    id: 1,
    type: "story",
    chapter: "Chapter 1",
    title: "Making Tax Less Taxing",
    body: "Tax compliance is nobody's favourite subject. I made it mine. I spent years at Avalara owning cross-border tax automation products — the kind of thing that makes finance teams break into a cold sweat. SAP integrations, NetSuite integrations, multi-jurisdiction edge cases. My job was to make it just work.",
    quote: "Complexity isn't the problem. Unexplained complexity is.",
    bg: "#f0f5e8",
    doodle: "🌐",
  },
  {
    id: 2,
    type: "story",
    chapter: "Chapter 2",
    title: "Payments at Scale",
    body: "From tax to payments. Same obsession: making financial infrastructure invisible. At Mindbody I owned the billing and payments platform for wellness businesses. Led the migration from TSYS to Stripe. High stakes. Real merchants. Zero tolerance for downtime.",
    quote: "The best payment experience is the one nobody notices.",
    bg: "#e8f0f5",
    doodle: "💳",
  },
  {
    id: 3,
    type: "story",
    chapter: "Chapter 3",
    title: "Zooming Out",
    body: "Mid-career, I made a deliberate bet. Step back. Zoom out. Sharpen the strategy side. The MBA in Vancouver was a chance to pressure-test my instincts and think at a systems level. It also opened a door I wasn't expecting: prototyping.",
    quote: "Sometimes the most strategic thing you can do is stop shipping and start thinking.",
    bg: "#f5f0e8",
    doodle: "🎓",
  },
  {
    id: 4,
    type: "story",
    chapter: "Chapter 4",
    title: "A PM Who Actually Builds Things",
    body: "I started building. Not writing PRDs about building — actually building. React apps, working prototypes, real interfaces. I entered the ProductBC Build-a-thon and shipped a working prototype from scratch. I did the user interviews, defined the problem, and then built the thing myself. This website? Same deal. Built with Claude as my coding collaborator.",
    quote: "The gap between product thinking and engineering is smaller than anyone told me.",
    bg: "#f0e8f5",
    doodle: "💻",
  },
  {
    id: 5,
    type: "polaroid",
    instaHandle: "@harshdotca",
  },
];

// ─── Tape corner graphic ──────────────────────────────────────────────────────
function Tape({ className }: { className?: string }) {
  return (
    <div
      className={`w-10 h-4 rounded-sm absolute ${className}`}
      style={{ background: "rgba(255,255,200,0.75)", opacity: 0.85 }}
    />
  );
}

// ─── Confetti ─────────────────────────────────────────────────────────────────
function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#E8630A", "#1A1A2E", "#f5e642", "#42c9f5", "#e542f5"][
      Math.floor(Math.random() * 5)
    ],
    delay: Math.random() * 0.5,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -10, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, rotate: 720 }}
          transition={{ duration: 2 + Math.random(), delay: p.delay }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ background: p.color, left: 0 }}
        />
      ))}
    </div>
  );
}

// ─── Card renderers ───────────────────────────────────────────────────────────
function BarbieCard() {
  return (
    <div
      className="h-full flex items-center justify-center p-6"
      style={{ background: "#FFF8F3" }}
    >
      <motion.div
        initial={{ rotate: -2 }}
        className="relative"
        style={{ maxWidth: 320 }}
      >
        <div
          className="relative overflow-hidden rounded"
          style={{ border: "12px solid white", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
        >
          <Image
            src="/harshad-barbie.png"
            alt="Let's Harshad a Deal"
            width={300}
            height={400}
            className="w-full object-cover"
            style={{ display: "block" }}
          />
        </div>
        <Tape className="-top-3 -left-3" />
        <Tape className="-top-3 -right-3" />
        <Tape className="-bottom-3 -left-3" />
        <Tape className="-bottom-3 -right-3" />
        <div
          className="text-center mt-4 text-xl"
          style={{ fontFamily: "var(--font-caveat), cursive", color: "#333" }}
        >
          Let&apos;s Harshad a Deal.
        </div>
        <div
          className="text-center text-xs mt-1"
          style={{ color: "#888", fontFamily: "var(--font-caveat), cursive" }}
        >
          Rated 3+. Some assembly required.
        </div>
      </motion.div>
    </div>
  );
}

function StoryCard({ card }: { card: CardData }) {
  return (
    <div
      className="h-full flex items-center justify-center p-6"
      style={{ background: card.bg }}
    >
      <div className="max-w-lg w-full">
        <div
          className="inline-block px-3 py-1 rounded mb-4 text-sm font-medium"
          style={{
            background: "#f5f0d0",
            color: "#666",
            fontFamily: "var(--font-caveat), cursive",
            transform: "rotate(-1deg)",
          }}
        >
          {card.chapter}
        </div>

        <div className="text-5xl mb-4">{card.doodle}</div>

        <h3
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "Georgia, serif", color: "#1A1A2E" }}
        >
          {card.title}
        </h3>

        <p className="text-base mb-6" style={{ color: "#444", lineHeight: 1.8 }}>
          {card.body}
        </p>

        <blockquote
          className="text-lg italic border-l-4 pl-4"
          style={{ color: "#E8630A", borderColor: "#E8630A", fontFamily: "Georgia, serif" }}
        >
          &ldquo;{card.quote}&rdquo;
        </blockquote>
      </div>
    </div>
  );
}

function PolaroidCard() {
  return (
    <div
      className="h-full flex items-center justify-center p-6"
      style={{ background: "#FFF8F3" }}
    >
      <motion.div
        initial={{ rotate: 2 }}
        className="text-center"
        style={{ maxWidth: 280 }}
      >
        <div
          className="bg-white p-4 pb-12 rounded-sm relative"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
        >
          <div
            className="w-full aspect-square rounded-sm flex items-center justify-center text-8xl"
            style={{ background: "#f0e0ff" }}
          >
            📸
          </div>
          <div
            className="absolute bottom-3 left-0 right-0 text-center text-xl"
            style={{ fontFamily: "var(--font-caveat), cursive", color: "#333" }}
          >
            @harshdotca
          </div>
        </div>
        <div className="mt-6">
          <p className="text-base mb-4" style={{ color: "#444" }}>
            I post things over at @harshdotca — come say hi.
          </p>
          <a
            href="https://www.instagram.com/harshdotca/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-full text-sm font-medium text-white transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, #E8630A, #833ab4)" }}
          >
            Follow on Instagram →
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FriendPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const { play } = useSounds();

  const navigate = (dir: 1 | -1) => {
    const next = current + dir;
    if (next < 0 || next >= cards.length) return;
    play("paper");
    setDirection(dir);
    setCurrent(next);
    track("journey_3_card_viewed", { card: next });
    if (next === cards.length - 1) {
      setShowConfetti(true);
      track("journey_3_completed");
      setTimeout(() => setShowConfetti(false), 2500);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const card = cards[current];

  return (
    <div
      className="h-screen overflow-hidden relative flex flex-col"
      style={{ background: "#FFF8F3" }}
    >
      {showConfetti && <Confetti />}

      {/* ── Header — always shows back button ── */}
      <div
        className="flex items-center justify-between px-5 py-3 z-20 relative"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", background: "#FFF8F3" }}
      >
        {/* Always-visible back to doors */}
        <BackToDoors variant="handwritten" />

        {/* Card counter */}
        <div
          className="text-sm"
          style={{ color: "#888", fontFamily: "var(--font-caveat), cursive" }}
        >
          {current + 1} / {cards.length}
        </div>
      </div>

      {/* ── Card area ── */}
      <div className="flex-1 relative overflow-hidden z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {card.type === "barbie" && <BarbieCard />}
            {card.type === "story" && <StoryCard card={card} />}
            {card.type === "polaroid" && <PolaroidCard />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation ── */}
      <div
        className="flex items-center justify-between px-6 py-3 z-20 relative"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)", background: "#FFF8F3" }}
      >
        {/* Prev arrow */}
        <button
          onClick={() => navigate(-1)}
          disabled={current === 0}
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-medium transition-all hover:scale-110 disabled:opacity-20"
          style={{
            background: current === 0 ? "rgba(0,0,0,0.04)" : "rgba(0,0,0,0.08)",
            color: "#333",
            border: "1px solid rgba(0,0,0,0.10)",
          }}
        >
          ←
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2 items-center">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const dir = i > current ? 1 : -1;
                setDirection(dir);
                play("paper");
                setCurrent(i);
                track("journey_3_card_viewed", { card: i });
              }}
              className="rounded-full transition-all"
              style={{
                width: current === i ? 20 : 8,
                height: 8,
                background: current === i ? "#E8630A" : "rgba(0,0,0,0.18)",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={() => navigate(1)}
          disabled={current === cards.length - 1}
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-medium transition-all hover:scale-110 disabled:opacity-20"
          style={{
            background: current === cards.length - 1 ? "rgba(0,0,0,0.04)" : "#E8630A",
            color: current === cards.length - 1 ? "#333" : "white",
            border: current === cards.length - 1 ? "1px solid rgba(0,0,0,0.10)" : "none",
          }}
        >
          →
        </button>
      </div>

      {/* ── Final card extras ── */}
      {current === cards.length - 1 && (
        <div className="text-center pb-2 z-20 relative">
          <DadJoke />
        </div>
      )}

      <ContactBar />
    </div>
  );
}
