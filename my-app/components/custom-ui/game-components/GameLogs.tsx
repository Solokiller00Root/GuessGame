import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

type GameLogsPropsType = {
  gameId: Id<"games">;
};

export default function GameLogs({ gameId }: GameLogsPropsType) {
  const game = useQuery(api.games.getGameById, { gameId });

  if (!game) return null;

  return (
    <div className="flex flex-col flex-1 gap-2 overflow-y-auto guessLogs-styling overflow-hidden ">
      {game.logs.map((log, index) => {
        return (
          <div key={index} className="text-sm">
            {log}
          </div>
        );
      })}
    </div>
  );
}
