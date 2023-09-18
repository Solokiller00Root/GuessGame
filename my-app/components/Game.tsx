"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import JoinGameModal from "./custom-ui/JoinGameModal";
import LeaderBoard from "./custom-ui/game-components/Leaderboard";
import GuessWord from "./custom-ui/game-components/GuessWord";

export default function Game() {
  const route = useRouter();

  const params = useParams();
  const gameId = params.gameId as Id<"games">;

  const { data: session } = useSession();

  const game = useQuery(api.games.getGameById, { gameId });
  const players = useQuery(api.games.getGamePlayers, {
    players: game?.players || [],
  });
  const user = useQuery(api.users.getUserByUsername, {
    username: session?.user?.name || "",
  });

  const joinGame = useMutation(api.games.joinGame);
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
    <div className="flex flex-col w-11/12  py-8 mt-8 bg-black border border-white rounded-xl md:flex-row conatiner-game">
      <LeaderBoard gameId={gameId} />
      <GuessWord gameId={gameId} />
    </div>
  );
}
