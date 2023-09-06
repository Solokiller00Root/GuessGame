import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guess Game",
  description: "Guess game for web dev cody hackathon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  );
}
