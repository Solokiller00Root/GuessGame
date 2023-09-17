import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useSession } from "next-auth/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import CustomButton from "../CustomButton";

type GameStatusOngoingPropsType = {
  gameId: Id<"games">;
};

export default function GameStatusOngoing({
  gameId,
}: GameStatusOngoingPropsType) {
  const [guessedWord, setGuessedWord] = useState("");
  const { data: session } = useSession();

  const game = useQuery(api.games.getGameById, { gameId });
  const user = useQuery(api.users.getUserByUsername, {
    username: session?.user?.name || "",
  });
  const players = useQuery(api.games.getGamePlayers, {
    players: game?.players || [],
  });

  const updateInGamePlayerPoints = useMutation(
    api.games.updateInGamePlayerPoints
  );
  const updateRoundStatus = useMutation(api.games.updateRoundStatus);
  const updateGameStatus = useMutation(api.games.updateGameStatus);
  const updateGameLogs = useMutation(api.games.updateGameLogs);

  if (!game) return null;
  if (!players) return null;

  const currentRound = game?.rounds.find((round) => round.status === "ongoing");

  const handleGuessWord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      guessedWord.toLocaleLowerCase() === currentRound?.word &&
      user &&
      user._id
    ) {
      const roundIndex = game.rounds.indexOf(currentRound);
      const guessedPlayer = players?.find((player) => player?._id === user._id);

      if (guessedPlayer) {
        updateInGamePlayerPoints({
          gameId: game?._id,
          userId: user._id,
          points: 1,
        });
      }
      updateRoundStatus({
        gameId: game?._id,
        roundIndex,
        status: "guessed",
      });

      if (roundIndex === game.rounds.length - 1) {
        updateGameStatus({ gameId: game?._id, status: "finished" });
      }

      updateGameLogs({
        gameId,
        log: `${user?.username} guessed the word: ${guessedWord}`,
      });
    }
    setGuessedWord("");
  };

  return (
    <div className="container relative flex flex-col items-center justify-center gap-y-8">
      <h1 className="text-4xl font-bold md:text-6xl max-sm:text-4xl">
        {currentRound?.brokenWord.toUpperCase()}
      </h1>
      <form
        className="flex flex-wrap items-center justify-center gap-4 input-word-game"
        onSubmit={handleGuessWord}
      >
        <input
          type="text"
          className="w-full p-4 text-2xl font-bold text-center border border-purple-600 rounded-md sm:w-3/5 input-styling md:text-4xl focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={guessedWord}
          onChange={(e) => setGuessedWord(e.target.value)}
          placeholder={`${currentRound?.word[0]}___${
            currentRound?.word[currentRound?.word.length - 1]
          }`}
        />

        <CustomButton type="submit" className="py-5 px-7">Submit</CustomButton>
      </form>
    </div>
  );
}
