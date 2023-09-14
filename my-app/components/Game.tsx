"use client";

import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import JoinGameModal from "./custom-ui/JoinGameModal";
import { useSession } from "next-auth/react";
import LeaderBoard from "./custom-ui/game-components/Leaderboard";
import GuessWord from "./custom-ui/game-components/GuessWord";

export default function Game() {
  const { data: session } = useSession();
  const params = useParams();
  const route = useRouter();
  const gameId = params.gameId as Id<"games">;
  const game = useQuery(api.games.getGameById, { gameId });
  const joinGame = useMutation(api.games.joinGame);
  const getSortedPlayers = useQuery(api.games.getSortedPlayers, {
    gameId,
  });
  const players = useQuery(api.games.getGamePlayers, {
    players: getSortedPlayers || [],
  });
  const user = useQuery(api.users.getUserByUsername, {
    username: session?.user?.name || "",
  });

  const updateGameStatus = useMutation(api.games.updateGameStatus);


  useEffect(() => {
    if (players?.length === 5) {
      updateGameStatus({ gameId, status: "ongoing" });
    }
  }, [players, gameId, updateGameStatus, game, route]);

  

  if (
    game &&
    user &&
    !game?.players.find((player) => player.id === user?._id)
  ) {
    if (game.privacy === "public") {
      joinGame({ gameId, userId: user?._id, password: "" });
      return;
    }
    return <JoinGameModal gameId={gameId} />;
  }
  return (
    <div className="flex flex-col w-11/12 border border-white bg-black/30 rounded-xl md:w-3/5 h-4/5  md:flex-row">
      <LeaderBoard gameId={gameId} />
      
      <GuessWord gameId={gameId} />      
    </div>
  );
}
