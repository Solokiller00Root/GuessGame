"use client"

import Game from "@/components/Game";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { redirect, useParams, useRouter } from "next/navigation";


export default  function Play() {
  const params = useParams();
  const gameId = params.gameId as Id<"games">;

  const game =  useQuery(api.games.getGameById, { gameId });


console.log(game)
console.log(gameId)


  return (
    <div>
      <Game />
    </div>
  );
}
