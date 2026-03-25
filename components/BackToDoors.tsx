"use client";

import { useRouter } from "next/navigation";
import { useSounds } from "./SoundManager";

interface BackToDoorsProps {
  variant?: "light" | "dark" | "handwritten";
}

export default function BackToDoors({ variant = "dark" }: BackToDoorsProps) {
  const router = useRouter();
  const { play } = useSounds();

  const handleClick = () => {
    play("whoosh");
    setTimeout(() => router.push("/"), 200);
  };

  if (variant === "handwritten") {
    return (
      <button
        onClick={handleClick}
        className="mt-8 px-6 py-3 text-lg transition-transform hover:scale-105 active:scale-95"
        style={{
          fontFamily: "'Caveat', cursive",
          color: "#E8630A",
          background: "none",
          border: "2px dashed #E8630A",
          borderRadius: "4px",
        }}
      >
        ← Pick a different door
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="mt-8 px-6 py-3 text-sm font-medium transition-all hover:scale-105 active:scale-95 rounded"
      style={{
        background: variant === "light" ? "rgba(255,255,255,0.15)" : "#E8630A",
        color: "white",
        border: "none",
      }}
    >
      ← Pick a different door
    </button>
  );
}
