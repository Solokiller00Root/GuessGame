"use client";

import Game from "@/components/Game";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Play() {
  const router = useRouter();
  const params = useParams();
  const gameId = params.gameId as Id<"games">;
  const checkGameIsValid = useQuery(api.games.checkGameIsValid, { gameId });

  useEffect(() => {
    if (checkGameIsValid !== undefined && !checkGameIsValid) {
      router.push("/not-found");
    }
  }, [checkGameIsValid, router]);

  return (
    <div>
      {checkGameIsValid ? (
        <Game />
      ) : (
        <section className="w-screen h-[75vh] flex justify-center items-center text-white">
          <h1>LOADING GAME INFO...</h1>
        </section>
      )}
    </div>
  );
}
