"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { SoundName, loadSound, playSound, setMuted, getMuted } from "@/lib/sounds";

interface SoundContextType {
  play: (name: SoundName) => void;
  muted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType>({
  play: () => {},
  muted: false,
  toggleMute: () => {},
});

export function useSounds() {
  return useContext(SoundContext);
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMutedState] = useState(false);

  useEffect(() => {
    const savedMuted = getMuted();
    setMutedState(savedMuted);
    setMuted(savedMuted);

    const sounds: SoundName[] = ["whoosh", "click", "paper", "keystroke", "chime", "glitch"];
    sounds.forEach(loadSound);
  }, []);

  const play = useCallback((name: SoundName) => {
    playSound(name);
  }, []);

  const toggleMute = useCallback(() => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
  }, [muted]);

  return (
    <SoundContext.Provider value={{ play, muted, toggleMute }}>
      {children}
      <MuteButton muted={muted} onToggle={toggleMute} />
    </SoundContext.Provider>
  );
}

function MuteButton({ muted, onToggle }: { muted: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110"
      style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)" }}
      title={muted ? "Unmute" : "Mute"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
