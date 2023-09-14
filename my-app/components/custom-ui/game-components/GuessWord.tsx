import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import CustomButton from "../CustomButton";
import Image from "next/image";


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


  const currentRound = game?.rounds.find((round) => round.status === "ongoing");
  const firstLetter = currentRound?.word.slice(0, 1);
  const lastLetter = currentRound?.word.slice(-1);
  if (!players) return null;

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
              className="input-styling w-3/5 px-4 py-4 text-2xl font-bold text-center border border-purple-600 rounded-md md:text-4xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={guessedWord}
              onChange={(e) => setGuessedWord(e.target.value)}
              placeholder={`${firstLetter}___${lastLetter}`}
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
      ) :game.status === "waiting" ? (
        <div className="container flex flex-col items-center justify-center relative">
          <h1 className="text-2xl font-bold md:text-4xl mb-4">Waiting for players to join...</h1>
          <div className="w-full max-w-md">
            {players.map((player, i) => {
              const isOdd = i % 2 !== 0;
              const isEven = i % 2 === 0;
              const playerData = getSortedPlayers && getSortedPlayers[i];
              return (
                <div
                  key={player?._id}
                  className={`flex justify-between items-center text-lg px-6 py-2 mb-2 rounded-md waiting-list ${
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
                </div>
              );
            })}
            {game.owner === user?._id && (
              <div className="flex flex-col items-center justify-center gap-4">
                <CustomButton
                  handleClick={() =>
                    updateGameStatus({ gameId: game?._id, status: "ongoing" })
                  }
                >
                  Start Game!
                </CustomButton>
              </div>
            )}
          </div>
        </div>
      )  : (

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
