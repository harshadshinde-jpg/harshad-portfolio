"use client";

import Image from "next/image";

interface BarbieBackgroundProps {
  progress?: number; // 0-1
  glitch?: boolean;
}

export default function BarbieBackground({ progress = 0, glitch = false }: BarbieBackgroundProps) {
  // Guard against NaN / Infinity from MotionValue objects passed as numbers
  const safeProgress =
    typeof progress !== "number" || isNaN(progress) || !isFinite(progress)
      ? 0
      : Math.max(0, Math.min(1, progress));

  const opacity = 0.05 + safeProgress * 0.75; // 5% → 80%
  const size = 60 + safeProgress * 40;        // 60vh → 100vh

  return (
    <div
      className="fixed bottom-0 right-0 pointer-events-none z-0 overflow-hidden"
      style={{
        width: `${size}vh`,
        height: `${size}vh`,
        opacity,
        transition: "opacity 0.5s ease, width 0.5s ease, height 0.5s ease",
      }}
    >
      <Image
        src={glitch ? "/harshad-barbie-glitch.png" : "/harshad-barbie.png"}
        alt=""
        fill
        className={`object-contain select-none ${glitch ? "glitch-anim" : ""}`}
        priority={false}
        style={{ objectPosition: "bottom right" }}
      />
    </div>
  );
}
