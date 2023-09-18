import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useSession } from "next-auth/react";
import CustomButton from "../CustomButton";
import Image from "next/image";

type GuessWordPropsType = {
  gameId: Id<"games">;
};

export default function GameStatusWaiting({ gameId }: GuessWordPropsType) {
  const game = useQuery(api.games.getGameById, { gameId });
  const players = useQuery(api.games.getGamePlayers, {
    players: game?.players || [],
  });
  const { data: session } = useSession();
  const user = useQuery(api.users.getUserByUsername, {
    username: session?.user?.name || "",
  });


  const updateGameStatus = useMutation(api.games.updateGameStatus);
  if (!game) return null;
  if (!players) return null;

  return (
    <div className="container flex flex-col items-center justify-center relative">
      <h1 className="text-2xl font-bold md:text-4xl mb-4">
        Waiting for players to join...
        {players.length > 0 && (
          <span className="text-xl font-semibold"> ({players.length}/5)</span>
        )}
      </h1>
      <div className="w-full max-w-md">
        {players.map((player, i) => {
          const isOdd = i % 2 !== 0;
          const isEven = i % 2 === 0;
          return (
            <div
              key={player?._id}
              className={`flex justify-between items-center text-lg px-6 py-2 mb-2 rounded-md  ${
                isOdd ? `bg-[#7C3AED]` : ""
              } ${isEven ? `bg-[#3A1463]` : ""}`}
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
            </div>
          );
        })}
        {game.owner === user?._id && (
          <div className="flex flex-col items-center justify-center py-10 ">
            {
              //TODO: change this to 3 when done testing
              game.players?.length < 1 ? (
                <p className="py-10">Need 3 or more players to start</p>
              ) : (
                <CustomButton
                  handleClick={() =>
                    updateGameStatus({ gameId: game?._id, status: "ongoing" })
                  }
                >
                  Start Game!
                </CustomButton>
              )
            }
          </div>
        )}
      </div>
    </div>
  );
}
