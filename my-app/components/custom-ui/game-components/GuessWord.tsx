import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import CustomButton from "../CustomButton";

type GuessWordPropsType = {
  gameId: Id<"games">;
};

export default function GuessWord({ gameId }: GuessWordPropsType) {
  const [guessedWord, setGuessedWord] = useState("");
  const { data: session } = useSession();

  const router = useRouter();

  const game = useQuery(api.games.getGameById, { gameId });
  const getSortedPlayers = useQuery(api.games.getSortedPlayers, {
    gameId,
  });
  const players = useQuery(api.games.getGamePlayers, {
    players: getSortedPlayers || [],
  });
  const user = useQuery(api.users.getUserByUsername, {
    username: session?.user?.name || "",
  });

  const updatePlayerPoints = useMutation(api.users.updatePlayerPoints);
  const updateInGamePlayerPoints = useMutation(
    api.games.updateInGamePlayerPoints
  );
  const updateRoundStatus = useMutation(api.games.updateRoundStatus);
  const updateGameStatus = useMutation(api.games.updateGameStatus);
  const updateGameLogs = useMutation(api.games.updateGameLogs);

  if (!game) return null;

  const handleGuessWord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    game?.rounds.forEach((round, index) => {
      if (guessedWord.toLocaleLowerCase() === round.word && user && user._id) {
        const guessedPlayer = players?.find(
          (player) => player?._id === user._id
        );
        if (guessedPlayer) {
          updateInGamePlayerPoints({
            gameId: game?._id,
            userId: user._id,
            points: 1,
          });
        }
        updateRoundStatus({
          gameId: game?._id,
          roundIndex: index,
          status: "guessed",
        });
        if (index + 1 >= game?.rounds.length) {
          const player = game.players?.find(
            (player) => player?.id === user._id
          );
          updateGameStatus({ gameId: game?._id, status: "finished" });
          updatePlayerPoints({
            userId: user._id,
            points: player?.points || 0,
          });
        }

        updateGameLogs({
          gameId,
          log: `${user?.username} guessed the word: ${guessedWord}`,
        });
        return;
      }
    });
    setGuessedWord("");
  };

  return (
    <>
      {game.status === "ongoing" ? (
        <div className="flex flex-col items-center justify-between my-6 md:w-2/3">
          <h1 className="text-2xl font-bold md:text-4xl ">Guess the word:</h1>
          <h1 className="text-4xl font-bold md:text-6xl">
            {game?.rounds
              .find((round) => round.status === "ongoing")
              ?.brokenWord.toUpperCase()}
          </h1>
          <form
            className="flex flex-wrap items-center justify-center gap-4 input-word-game"
            onSubmit={handleGuessWord}
          >
            <input
              type="text"
              className="w-3/5 px-4 py-2 text-2xl font-bold text-center border border-gray-300 rounded-md md:text-4xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={guessedWord}
              onChange={(e) => setGuessedWord(e.target.value)}
            />
            <CustomButton type="submit">
              Submit
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-6 h-6 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </CustomButton>
          </form>
        </div>
      ) : game.status === "waiting" ? (
        <div className="flex flex-col items-center justify-center gap-4 my-6 md:w-2/3">
          <h1 className="text-2xl font-bold text-center md:text-4xl">
            Waiting for players to join...
          </h1>
          {game.owner === user?._id && (
            <>
              <div className="m-10"></div>
              <CustomButton
                handleClick={() =>
                  updateGameStatus({ gameId: game?._id, status: "ongoing" })
                }
              >
                Start Game!
              </CustomButton>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 my-6 md:w-2/3">
          <h1 className="text-2xl font-bold md:text-4xl">Game is finished!</h1>
          <div>
            <CustomButton
              handleClick={() => {
                router.push("/#games");
              }}
            >
              PLAY AGAIN!
            </CustomButton>
          </div>
        </div>
      )}
    </>
  );
}
