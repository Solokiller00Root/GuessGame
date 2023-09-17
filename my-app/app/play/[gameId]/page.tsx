"use client";

import Game from "@/components/Game";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Play() {
  const router = useRouter();
  const params = useParams();
  const gameId = params.gameId as Id<"games">;
  const checkGameIsValid = useQuery(api.games.checkGameIsValid, { gameId });
  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push(
      "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
    );
  }

  useEffect(() => {
    if (checkGameIsValid !== undefined && !checkGameIsValid) {
      router.push("/not-found");
    }
  }, [checkGameIsValid, router]);

  return (
    <section className="flex items-center justify-center w-screen text-white">
      {checkGameIsValid ? (
        <Game />
      ) : (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </section>
  );
}
