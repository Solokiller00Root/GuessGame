"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import JoinGameModal from "./custom-ui/JoinGameModal";
import { useSession } from "next-auth/react";

export default function Game() {
  const [guessedWord, setGuessedWord] = useState("");
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
  const updatePlayerPoints = useMutation(api.users.updatePlayerPoints);
  const updateInGamePlayerPoints = useMutation(
    api.games.updateInGamePlayerPoints
  );
  const updateRoundStatus = useMutation(api.games.updateRoundStatus);
  const updateGameStatus = useMutation(api.games.updateGameStatus);
  const updateGameLogs = useMutation(api.games.updateGameLogs);

  useEffect(() => {
    if (players?.length === 5) {
      updateGameStatus({ gameId, status: "ongoing" });
    }
  }, [players, gameId, updateGameStatus, game, route]);

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

  if (!game || !players) {
    return;
  }

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
    <div className="border bg-black/30 border-white rounded-xl w-11/12 md:w-3/5 h-4/5 game flex flex-col md:flex-row game">
      <div className="border-r-2 border-white p-4 flex flex-col items-center justify-between md:w-1/3">
        <div className="text-xl mb-4">Game Leaderboard</div>
        <div className="flex flex-col gap-2 flex-1 w-full">
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
                <h4 className="text-xl font-semibold py-1 m-2">{i + 1}.</h4>
                <Image
                  src={player?.image || "/default-avatar.png"}
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full mr-2 px-1 py-2 object-cover"
                />
                <div className="flex-1">{player?.username}</div>
                <div className="w-8">{playerData?.points}</div>
              </div>
            );
          })}
        </div>
        <hr className="w-full border-gray-300 my-4" />
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {game.logs.map((log, index) => {
            return (
              <div key={index} className="text-sm">
                {log}
              </div>
            );
          })}
        </div>
      </div>
      {game.status === "ongoing" ? (
        <div className="flex flex-col items-center justify-between my-6 md:w-2/3">
          <h1 className="text-2xl md:text-4xl font-bold ">Guess the word:</h1>
          <h1 className="text-4xl md:text-6xl font-bold">
            {game?.rounds
              .find((round) => round.status === "ongoing")
              ?.brokenWord.toUpperCase()}
          </h1>
          <form
            className="flex justify-center items-center flex-wrap gap-4 input-word-game"
            onSubmit={handleGuessWord}
          >
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-3/5 text-center text-2xl md:text-4xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={guessedWord}
              onChange={(e) => setGuessedWord(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded"
            >
              Submit
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2 inline-block"
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
            </button>
          </form>
        </div>
      ) : game.status === "waiting" ? (
        <div className="flex flex-col items-center justify-center gap-4 my-6 md:w-2/3">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Waiting for players to join...
          </h1>
          {game.owner === user?._id && (
            <button
              onClick={() => {
                updateGameStatus({ gameId: game?._id, status: "ongoing" });
              }}
              className="bg-blue-500 m-10 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded"
            >
              Start Game!
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 my-6 md:w-2/3">
          <h1 className="text-2xl md:text-4xl font-bold">Game is finished!</h1>
          <div>
            <button
              onClick={() => {
                route.push("/#games");
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded"
            >
              PLAY AGAIN!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
