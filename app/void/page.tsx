"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ContactBar from "@/components/ContactBar";
import { useSounds } from "@/components/SoundManager";
import { track } from "@/lib/posthog";

type Stage = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const GREEN = "#00FF41";
const DIM = "rgba(0,255,65,0.45)";

// ─── Stage text ───────────────────────────────────────────────────────────────
const stageText: Record<number, string[]> = {
  0: [
    "HARSHAD OS v8.2 — INITIALISING...",
    "> LOADING FINANCIAL_INFRASTRUCTURE.pkg  ████████░░  80%",
    "> LOADING MBA.pkg  ██████████  100%",
    "> LOADING PROTOTYPE_MODE.pkg  ██████████  100%",
    "> SYSTEM READY.",
    "",
    "You have arrived somewhere unexpected.",
    "That's fine. The cursor will wait.",
    "",
    "> Commands: LOOK  |  DOORS (return to start)",
    "",
    "> Type anything to begin.",
  ],
  1: [
    "> LOOK",
    "",
    "Nobody really knows what a Product Manager does.",
    "Including, occasionally, the Product Manager.",
    "",
    "The official definition: responsible for strategy, roadmap, execution.",
    "The real definition: the person everyone comes to when something isn't working,",
    "and the last person anyone invites when something is.",
    "",
    "No code. No design. No sales quota.",
    "A PM has opinions about everything and authority over almost nothing —",
    "and somehow has to make the product ship anyway.",
    "",
    "Like a film director who doesn't own the camera, can't act,",
    "didn't write the screenplay, but is still responsible for whether the movie is good.",
    "",
    "> Shall we go deeper? (Y/N)",
  ],
  2: [
    "",
    "The job is mostly uncertainty management.",
    "Almost never working with complete information.",
    "Constantly making decisions with 60% of the data you wish you had",
    "and 100% of the accountability if you get it wrong.",
    "",
    "The good days feel like conducting an orchestra.",
    "The other days: you can see the iceberg, the captain is in three other meetings,",
    "and you're the only one who knows the ship isn't turning fast enough.",
    "",
    "The skill that separates a good PM from a great one:",
    "knowing which problem is actually worth solving.",
    "Not the loudest one. The one that, if fixed, makes everything else easier.",
    "",
    "> Challenge the myths? (Y/N)",
  ],
  3: [
    "",
    "Myth: The PM is the CEO of the product.",
    "Reality: The CEO has a budget and can fire people.",
    "         The PM has a Jira board and strongly worded Slack messages.",
    "",
    "Myth: PMs don't need to understand technology.",
    "Reality: You don't need to write the code.",
    "         But if you can't have a real conversation about engineering tradeoffs,",
    "         you're not a partner — you're overhead.",
    "",
    "Myth: Success means shipping features.",
    "Reality: The best outcome is often nothing visible at all.",
    "         If it just works, invisibly — that's the win.",
    "",
    "Myth: PMs are born, not made.",
    "Reality: I started in financial compliance. Learned payments by owning a migration.",
    "         Learned prototyping during an MBA.",
    "         The best PMs keep adding tools to the kit.",
    "",
    "> Got an idea? Type: IDEA",
    "> Or return to start: DOORS",
  ],
  5: [
    "",
    "> Transmitting into the void...",
    "> ████████████████  100%",
    "> Signal confirmed. Harshad will read it.",
    "",
    "> Type MORE if you're curious about what's next.",
    "> Type DOORS to return to the beginning.",
  ],
  6: [
    "",
    "> Session complete.",
    "> Thank you for existing on the internet today.",
    "> Type DOORS to return to the beginning.",
  ],
};

// ─── Idea Form ────────────────────────────────────────────────────────────────
function IdeaForm({ onSubmit }: { onSubmit: (name: string, idea: string, email: string) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, [step]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    const val = input.trim();
    if (step === 0) { setName(val); setStep(1); }
    else if (step === 1) { if (!val) return; setIdea(val); setStep(2); }
    else if (step === 2) { setEmail(val); setStep(3); }
    else if (step === 3 && val.toUpperCase() === "SEND") { onSubmit(name, idea, email); }
    setInput("");
  };

  const prompts = [
    "> Enter your name (or ENTER to stay anonymous):",
    "> Describe your idea:",
    "> Your email (optional — ENTER to skip):",
    "> Type SEND to transmit.",
  ];

  return (
    <div className="font-terminal text-sm" style={{ color: GREEN }}>
      <div style={{ color: DIM }}>{">"} IDEA SUBMISSION MODE ACTIVATED</div>
      <div className="mt-2" />
      {prompts.slice(0, step + 1).map((p, i) => (
        <div key={i}>
          <div style={{ color: i < step ? DIM : GREEN }}>{p}</div>
          {i === 0 && step > 0 && <div style={{ color: "rgba(0,255,65,0.8)" }}>&gt; {name || "(anonymous)"}</div>}
          {i === 1 && step > 1 && <div style={{ color: "rgba(0,255,65,0.8)" }}>&gt; {idea}</div>}
          {i === 2 && step > 2 && <div style={{ color: "rgba(0,255,65,0.8)" }}>&gt; {email || "(no email)"}</div>}
        </div>
      ))}
      <div className="flex items-center gap-1 mt-1">
        <span style={{ color: GREEN }}>&gt;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="bg-transparent outline-none flex-1 font-terminal text-sm"
          style={{ color: GREEN, caretColor: GREEN }}
          autoFocus
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function VoidPage() {
  const router = useRouter();
  const { play } = useSounds();
  const [stage, setStage] = useState<Stage>(0);
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [showIdea, setShowIdea] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [glitch, setGlitch] = useState(false);

  const appendHistory = useCallback((lines: string[]) => {
    setHistory((prev) => [...prev, ...lines]);
  }, []);

  const advanceStage = useCallback((next: Stage) => {
    setStage(next);
    track("journey_4_stage_reached", { stage: next });
    const lines = stageText[next];
    if (lines) appendHistory(lines);
  }, [appendHistory]);

  // Init
  useEffect(() => {
    setHistory(stageText[0] ?? []);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, showIdea]);

  // Auto-focus input
  useEffect(() => { inputRef.current?.focus(); }, [showIdea]);

  const handleCommand = useCallback((cmd: string) => {
    const c = cmd.trim().toUpperCase();
    appendHistory([`> ${cmd}`]);

    // DOORS is always available
    if (c === "DOORS") {
      play("whoosh");
      appendHistory(["> Returning to the beginning..."]);
      setTimeout(() => router.push("/"), 500);
      return;
    }

    if (stage === 0) {
      if (cmd.trim() !== "") advanceStage(1);
    } else if (stage === 1) {
      if (["Y", "YES", "DEEPER", "YEP", "SURE"].includes(c)) {
        advanceStage(2);
      } else if (["N", "NO", "EXIT", "NOPE"].includes(c)) {
        setShowIdea(true);
        setStage(4);
        track("journey_4_stage_reached", { stage: 4 });
      } else {
        appendHistory(["Command not recognised. Type Y, N, or DOORS."]);
      }
    } else if (stage === 2) {
      if (["Y", "YES", "SURE", "DEEPER", "YEP"].includes(c)) {
        advanceStage(3);
      } else if (["N", "NO", "EXIT", "NOPE"].includes(c)) {
        setShowIdea(true);
        setStage(4);
        track("journey_4_stage_reached", { stage: 4 });
      } else if (c === "IDEA") {
        setShowIdea(true);
        setStage(4);
        track("journey_4_stage_reached", { stage: 4 });
      } else {
        appendHistory(["Command not recognised. Type Y, N, IDEA, or DOORS."]);
      }
    } else if (stage === 3) {
      if (c === "IDEA") {
        setShowIdea(true);
        setStage(4);
        track("journey_4_stage_reached", { stage: 4 });
      } else {
        appendHistory(["Command not recognised. Type IDEA to share something, or DOORS to leave."]);
      }
    } else if (stage === 5) {
      if (c === "MORE") {
        setGlitch(true);
        play("glitch");
        track("easter_egg_found", { source: "void_terminal" });
        setTimeout(() => router.push("/base"), 800);
      } else {
        appendHistory(["Type MORE to dig deeper, or DOORS to return."]);
      }
    } else if (stage === 6) {
      appendHistory(["Type DOORS to return to the beginning."]);
    } else {
      appendHistory(["Command not recognised. Type DOORS to return."]);
    }
  }, [stage, play, router, appendHistory, advanceStage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      play("keystroke");
      return;
    }
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
  };

  const handleIdeaSubmit = async (name: string, idea: string, email: string) => {
    setShowIdea(false);
    appendHistory(["> Transmitting...", "> ████████████████  100%"]);
    try {
      await fetch("/api/idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, idea, email }),
      });
      track("journey_4_idea_submitted");
    } catch { /* silent fail */ }
    appendHistory(stageText[5] ?? []);
    setStage(5);
  };

  return (
    <div
      className="h-screen overflow-hidden relative flex flex-col"
      style={{ background: "#000000" }}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines z-10 opacity-20" />

      {/* Subtle Barbie ghost */}
      <div
        className="absolute bottom-12 right-4 pointer-events-none z-0"
        style={{ width: "22vw", height: "36vh", opacity: 0.14 }}
      >
        <Image
          src={glitch ? "/harshad-barbie-glitch.png" : "/harshad-barbie.png"}
          alt=""
          fill
          className={`object-contain ${glitch ? "glitch-anim" : ""}`}
          style={{ objectPosition: "bottom right", filter: "hue-rotate(120deg)" }}
        />
      </div>

      {/* Terminal output */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-5 pb-2 z-20 relative font-terminal text-sm"
        style={{ color: GREEN }}
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div
            key={i}
            className="mb-0.5 whitespace-pre-wrap"
            style={{ color: i < history.length - 6 ? DIM : GREEN }}
          >
            {line || "\u00A0"}
          </div>
        ))}

        {showIdea && (
          <div className="mt-3">
            <IdeaForm onSubmit={handleIdeaSubmit} />
          </div>
        )}
      </div>

      {/* Input bar */}
      {!showIdea && (
        <div
          className="flex items-center gap-2 px-5 py-3 z-20 relative"
          style={{ borderTop: "1px solid rgba(0,255,65,0.15)" }}
        >
          <span className="font-terminal text-sm" style={{ color: GREEN }}>&gt;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none font-terminal text-sm"
            style={{ color: GREEN, caretColor: GREEN }}
            placeholder="type a command..."
            autoFocus
            spellCheck={false}
          />
          <span className="cursor-blink font-terminal" style={{ color: GREEN }}>█</span>
        </div>
      )}

      <ContactBar />
    </div>
  );
}
