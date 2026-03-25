"use client";

export type SoundName = "whoosh" | "click" | "paper" | "keystroke" | "chime" | "glitch";

let audioContext: AudioContext | null = null;
const audioBuffers: Map<SoundName, AudioBuffer> = new Map();
let muted = false;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
}

export async function loadSound(name: SoundName): Promise<void> {
  try {
    const ctx = getAudioContext();
    const response = await fetch(`/sounds/${name}.mp3`);
    if (!response.ok) return;
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    audioBuffers.set(name, audioBuffer);
  } catch {
    // Sound files may not exist yet — silent fail
  }
}

export function playSound(name: SoundName): void {
  if (muted) return;
  const buffer = audioBuffers.get(name);
  if (!buffer) return;
  try {
    const ctx = getAudioContext();
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
  } catch {
    // Ignore playback errors
  }
}

export function setMuted(value: boolean): void {
  muted = value;
  if (typeof window !== "undefined") {
    localStorage.setItem("harshad-muted", String(value));
  }
}

export function getMuted(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem("harshad-muted") === "true";
  }
  return false;
}
