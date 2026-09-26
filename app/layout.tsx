import type { Metadata } from "next";
import "./globals.css";
import PosthogProvider from "./PosthogProvider";

export const metadata: Metadata = {
  title: "Harshad Shinde — Senior Product Manager",
  description:
    "Senior Product Manager building payments, billing, and compliance infrastructure. Also mentoring the next generation of PMs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PosthogProvider>{children}</PosthogProvider>
      </body>
    </html>
  );
}
