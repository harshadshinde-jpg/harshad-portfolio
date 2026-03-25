"use client";

import { useState, useEffect } from "react";
import { dadJokes } from "@/lib/jokes";

export default function DadJoke() {
  const [joke, setJoke] = useState<string>("");

  useEffect(() => {
    setJoke(dadJokes[Math.floor(Math.random() * dadJokes.length)]);
  }, []);

  if (!joke) return null;

  return (
    <div className="text-center py-6 px-4" style={{ color: "#999999" }}>
      <span className="text-lg">😄 </span>
      <span className="text-sm italic">{joke}</span>
    </div>
  );
}
