"use client";

export default function ContactBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-4 px-4"
      style={{ background: "#E8630A", height: "48px" }}
    >
      <span className="text-white font-bold text-sm">Wanna get in touch?</span>
      <a
        href="mailto:harshadshinde@gmail.com"
        className="text-white text-sm underline underline-offset-2 hover:opacity-80 transition-opacity"
        target="_blank"
        rel="noopener noreferrer"
      >
        harshadshinde@gmail.com
      </a>
      <span className="text-white opacity-60 text-sm">|</span>
      <a
        href="https://linkedin.com/in/harshadshindepm"
        className="text-white text-sm underline underline-offset-2 hover:opacity-80 transition-opacity"
        target="_blank"
        rel="noopener noreferrer"
      >
        linkedin.com/in/harshadshindepm
      </a>
    </div>
  );
}
