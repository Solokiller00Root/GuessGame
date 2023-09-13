import Image from "next/image";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import GameLogs from "./GameLogs";

type LeadboardPropsType = {
  gameId: Id<"games">;
};

export default function LeaderBoard({ gameId }: LeadboardPropsType) {
  const getSortedPlayers = useQuery(api.games.getSortedPlayers, {
    gameId,
  });
  const players = useQuery(api.games.getGamePlayers, {
    players: getSortedPlayers || [],
  });

  if (!players) return null;

  return (
    <div className="flex flex-col items-center justify-between p-4 border-r-2 border-white md:w-1/3">
      <div className="mb-4 text-xl">Game Leaderboard</div>
      <div className="flex flex-col flex-1 w-full gap-2">
        {players.map((player, i) => {
          const isOdd = i % 2 !== 0;
          const isEven = i % 2 === 0;
          const playerData = getSortedPlayers && getSortedPlayers[i];
          return (
            <div
              key={player?._id}
              className={`flex justify-between items-center text-lg w-full rounded-md ${
                isOdd ? `bg-[#4e4b51]` : ""
              } ${isEven ? `bg-[#3d3a41]` : ""}`}
            >
              <h4 className="py-1 m-2 text-xl font-semibold">{i + 1}.</h4>
              <Image
                src={player?.image || "/default-avatar.png"}
                alt="User avatar"
                width={32}
                height={32}
                className="object-cover px-1 py-2 mr-2 rounded-full"
              />
              <div className="flex-1">{player?.username}</div>
              <div className="w-8">{playerData?.points}</div>
            </div>
          );
        })}
      </div>
      <hr className="w-full my-4 border-gray-300" />
      <GameLogs gameId={gameId} />
    </div>
  );
}
