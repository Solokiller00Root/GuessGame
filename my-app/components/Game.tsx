"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

const logs = [
  "slalom guessed the word: mountain",
  "wind guessed the word: mountain",
  "bruise guessed the word: mountain",
  "mountain guessed the word: mountain",
  "bountiful guessed the word: mountain",
];

export default function Game() {
  const [guessedWord, setGuessedWord] = useState("");
  const params = useParams();
  const gameId = params.gameId as Id<"games">;
  const game = useQuery(api.games.getGameById, { gameId });
  const players = useQuery(api.games.getGamePlayers, {
    players: game?.players || [],
  });

  players?.sort((a, b) => {
    if (a && b) {
      return a.points - b.points || a.username.localeCompare(b.username);
    }
    return 0;
  });

  const handleGuessWord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGuessedWord("");
    //TODO: compare the guess with the correct word
  };

  if (!game || !players) {
    <section className="w-screen h-[75vh] flex justify-center items-center text-white">
      <h1>LOADING GAME INFO!</h1>
    </section>;
  }

  return (
    <section className="w-screen h-[75vh] flex justify-center items-center text-white">
      <div className="border bg-black/30 border-white rounded-xl w-11/12 md:w-3/5  h-4/5 game flex flex-col md:flex-row ">
        <div className="border-r-2 border-white p-4 flex flex-col items-center justify-between md:w-1/3 ">
          <div className="text-xl mb-4">Game Leaderboard</div>
          <div className="flex flex-col gap-2 flex-1 w-full">
            {players?.reverse().map((player, i) => {
              const isOdd = i % 2 !== 0;
              const isEven = i % 2 === 0;
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
                    className="rounded-full mr-2 px-1 py-2 object-cover "
                  />
                  <div className="flex-1">{player?.username}</div>
                  <div className="w-8">{player?.points}</div>
                </div>
              );
            })}
          </div>
          <hr className="w-full border-gray-300 my-4" />
          <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
            {logs.map((log, index) => {
              return (
                <div key={index} className="text-sm">
                  {log}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between my-6 md:w-2/3">
          <h1 className="text-2xl md:text-4xl font-bold">Guess the word:</h1>
          <h1 className="text-4xl md:text-6xl font-bold">Word</h1>
          <form
            className="flex justify-center items-center flex-wrap gap-4 input-word-game"
            onSubmit={handleGuessWord}
          >
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-3/5  text-center text-2xl md:text-4xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-600"
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
      </div>
    </section>
  );
}
