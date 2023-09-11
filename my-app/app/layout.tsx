import "./globals.css";
import type { Metadata } from "next";
import SessionProvider from '@/lib/SessionProvider'
import { getServerSession } from "next-auth";
import Navbar from "@/components/NavBar";
import ConvexClientProvider from "./ConvexClientProvider";

export const metadata: Metadata = {
  title: "Guess Game",
  description: "Guess game for web dev cody hackathon",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="bg-background">
        <SessionProvider session={session}>
          <ConvexClientProvider>
            <main>
              <Navbar />
              {children}
            </main>
          </ConvexClientProvider>
        </SessionProvider>

      </body>
    </html>
  );
}
