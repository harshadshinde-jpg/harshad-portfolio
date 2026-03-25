"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSounds } from "@/components/SoundManager";
import { track } from "@/lib/posthog";

const doors = [
  {
    id: "hirer",
    emoji: "👔",
    label: "I'm hiring",
    sublabel: "— or thinking about it",
    teaser: "8+ years. Payments. Tax. Compliance. One PM who can actually build.",
    bg: "#EEF1FF",
    hoverBg: "#D8DEFF",
    textColor: "#1A1A2E",
    subColor: "#5560AA",
    teaserColor: "#7880CC",
    borderColor: "#C0CAFF",
    labelStyle: { fontFamily: "Georgia, serif" },
    href: "/hirer",
  },
  {
    id: "pm",
    emoji: "🧠",
    label: "I'm a fellow PM",
    sublabel: "— here to steal ideas",
    teaser: "See how this portfolio was built as a product. Full kanban, open process.",
    bg: "#EDFAED",
    hoverBg: "#D2F0D2",
    textColor: "#0F2010",
    subColor: "#3A7A3A",
    teaserColor: "#5A9A5A",
    borderColor: "#A0D8A0",
    labelStyle: { fontFamily: "Courier New, monospace" },
    href: "/pm",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { play } = useSounds();
  const [openDoor, setOpenDoor] = useState<string | null>(null);
  const [hoveredDoor, setHoveredDoor] = useState<string | null>(null);

  const handleHover = (id: string) => {
    if (!hoveredDoor) play("whoosh");
    setHoveredDoor(id);
  };

  const handleClick = (door: (typeof doors)[0]) => {
    if (openDoor) return;
    play("whoosh");
    setOpenDoor(door.id);
    track("door_selected", { door: door.id });
    setTimeout(() => router.push(door.href), 600);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-10 px-4"
      style={{ background: "#F8F7F2" }}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-10 z-10"
        style={{ maxWidth: 600 }}
      >
        <h1
          className="text-3xl md:text-5xl font-bold mb-3"
          style={{ color: "#E8630A", fontFamily: "Georgia, serif" }}
        >
          Welcome to Harshad&apos;s World.
        </h1>
        <p className="text-lg md:text-xl mb-1" style={{ color: "#444444" }}>
          One question. Two doors. One person behind both of them.
        </p>
        <p className="text-base" style={{ color: "#999999" }}>
          Who are you?
        </p>
      </motion.div>

      {/* Two large doors — side by side on desktop, stacked on mobile */}
      <div className="flex flex-col md:flex-row gap-5 w-full max-w-5xl z-10">
        {doors.map((door, i) => {
          const isHovered = hoveredDoor === door.id;
          const isOpen = openDoor === door.id;

          return (
            <motion.div
              key={door.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 + i * 0.12 }}
              style={{ perspective: "1200px", flex: 1 }}
            >
              <motion.button
                onHoverStart={() => handleHover(door.id)}
                onHoverEnd={() => setHoveredDoor(null)}
                onClick={() => handleClick(door)}
                animate={{
                  rotateY: isOpen ? -85 : isHovered ? -10 : 0,
                  backgroundColor: isHovered || isOpen ? door.hoverBg : door.bg,
                }}
                transition={{ duration: isOpen ? 0.55 : 0.22 }}
                className="w-full relative overflow-hidden cursor-pointer text-left"
                style={{
                  height: "clamp(200px, 38vh, 340px)",
                  borderRadius: "16px",
                  border: `1.5px solid ${door.borderColor}`,
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  boxShadow: isHovered
                    ? `0 12px 40px rgba(0,0,0,0.10), 0 0 0 2px ${door.borderColor}`
                    : "0 2px 12px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.2s ease",
                }}
              >
                {/* Light spill on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 55%)",
                  }}
                />

                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  {/* Top */}
                  <div>
                    <div className="text-5xl mb-4">{door.emoji}</div>
                    <div
                      className="text-2xl font-semibold mb-1"
                      style={{ color: door.textColor, ...door.labelStyle }}
                    >
                      {door.label}
                    </div>
                    <div className="text-base mb-4" style={{ color: door.subColor }}>
                      {door.sublabel}
                    </div>
                    <motion.p
                      animate={{ opacity: isHovered ? 1 : 0.55 }}
                      className="text-sm leading-relaxed"
                      style={{ color: door.teaserColor, maxWidth: 260 }}
                    >
                      {door.teaser}
                    </motion.p>
                  </div>

                  {/* Bottom arrow */}
                  <motion.div
                    animate={{ x: isHovered ? 10 : 0, opacity: isHovered ? 1 : 0.2 }}
                    className="text-right text-xl font-medium"
                    style={{ color: "#E8630A" }}
                  >
                    Enter →
                  </motion.div>
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Resume link — subtle but findable */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-8 z-10"
      >
        <a
          href="/resume"
          className="text-sm transition-all hover:opacity-80"
          style={{ color: "#BBBBBB", textDecoration: "none" }}
          onClick={() => track("resume_link_clicked", { source: "landing" })}
        >
          Just want the resume? →
        </a>
      </motion.div>

      {/* Easter egg — near invisible */}
      <a
        href="/base"
        className="absolute bottom-2 left-2 text-xs select-none z-10"
        style={{ color: "rgba(0,0,0,0.04)", textDecoration: "none" }}
        onClick={() => track("easter_egg_found", { source: "landing" })}
      >
        or skip all of this
      </a>
    </div>
  );
}
