import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/components/SoundManager";
import PosthogProvider from "./PosthogProvider";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harshad's World",
  description: "One question. Four doors. One person behind all of them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={caveat.variable}>
      <body style={{ fontFamily: "Calibri, system-ui, sans-serif" }}>
        <PosthogProvider>
          <SoundProvider>
            {children}
          </SoundProvider>
        </PosthogProvider>
      </body>
    </html>
  );
}
