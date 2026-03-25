"use client";

import { useEffect, ReactNode } from "react";
import { initPosthog } from "@/lib/posthog";

export default function PosthogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initPosthog();
  }, []);

  return <>{children}</>;
}
