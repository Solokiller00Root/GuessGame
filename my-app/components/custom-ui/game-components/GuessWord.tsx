import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import GameStatusWaiting from "../game-components-status/GameStatusWaiting";
import GameStatusOngoing from "../game-components-status/GameStatusOngoing";
import GameStatusFinished from "../game-components-status/GameStatusFinished";

type GuessWordPropsType = {
  gameId: Id<"games">;
};

export default function GuessWord({ gameId }: GuessWordPropsType) {
  const game = useQuery(api.games.getGameById, { gameId });
  const players = useQuery(api.games.getGamePlayers, {
    players: game?.players || [],
  });

  if (!game) return null;
  if (!players) return null;

  return (
    <>
      {game.status === "ongoing" ? (
        <GameStatusOngoing gameId={gameId} />
      ) : game.status === "waiting" ? (
        <GameStatusWaiting gameId={gameId} />
      ) : (
        <GameStatusFinished />
      )}
    </>
  );
}
