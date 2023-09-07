import "./globals.css";
import type { Metadata } from "next";





import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
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
          <main>
          
           {children}
        </main>
          </SessionProvider>
        </body>
    </html>
  );
}
