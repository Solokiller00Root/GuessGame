'use client'

import React, { useState, useRef,useEffect } from "react";
import {useSession } from "next-auth/react";
import Image from "next/image";

const fakePlayers = [
  { username: "slalom", points: 3 },
  { username: "wind", points: 1 },
  { username: "bruise", points: 4 },
  { username: "mountain", points: 0 },
  { username: "bountiful", points: 0 },
];



const logs = [
  "slalom guessed the word: mountain",
  "wind guessed the word: mountain",
  "bruise guessed the word: mountain",
  "mountain guessed the word: mountain",
  "bountiful guessed the word: mountain",
];

export default function Game() {
  const [guessedWord, setGuessedWord] = useState("");
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);
  const input4Ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    input1Ref.current?.focus();
  }, []);



  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    inputRef: React.RefObject<HTMLInputElement>,
    prevInputRef?: React.RefObject<HTMLInputElement>,
    nextInputRef?: React.RefObject<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      return;
    }

    if (event.key === "Backspace") {
      event.preventDefault();
      if (inputRef.current?.value === "") {
        prevInputRef?.current?.focus();
      }
      setGuessedWord((prev) => prev.slice(0, -1));
      return;
    }

    if (event.key.length === 1) {
      event.preventDefault();
      const value = event.key.toUpperCase();
      setGuessedWord((prev) => prev + value);
      nextInputRef?.current?.focus();
    }
  };
  fakePlayers.sort((a, b) =>
    a.points - b.points || a.username.localeCompare(b.username)
  );

  const handleGuessWord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGuessedWord("");
    //TODO: compare the guess with the correct word
  };
  const { data: session } = useSession();
  return (
    <section className="w-screen h-[75vh] flex justify-center items-center text-white">
    <div className="border bg-black/30 border-white rounded-xl w-11/12 md:w-3/5  h-4/5 game flex flex-col md:flex-row ">
      <div className="border-r-2 border-white p-4 flex flex-col items-center justify-between md:w-1/3 ">
        <div className="text-xl mb-4">Game Leaderboard</div>
        <div className="flex flex-col gap-2 flex-1 w-full">
          {fakePlayers.reverse().map((player, i) => {
              const isOdd = i % 2 !== 0;
              const isEven = i % 2 === 0;
            return (
              
              <div
              key={player.username}
              className={`flex justify-between items-center text-lg w-full rounded-md ${
                isOdd ? `bg-[#4e4b51]` : ""
              } ${isEven ? `bg-[#3d3a41]` : ""}`}
            >
              <h4 className="text-xl font-semibold py-1 m-2">{i+1}.</h4>
               <Image
        src={session?.user?.image || "/default-avatar.png"}
        alt="User avatar"
        width={32}
        height={32}
        className="rounded-full mr-2 px-1 py-2 object-cover "
      />
                <div className="flex-1">{player.username}</div>
                <div className="w-8">{player.points}</div>
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
      <div className="flex flex-col items-center justify-center md:w-2/3">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 py-5">
          Guess the word:
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold mb-8 py-20 ">Word</h1>
        <div className="flex justify-center items-center flex-wrap py-20 h-screen input-word-game">
            <div className="mx-5">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-12 md:w-24 mx-2 mb-2 text-center text-2xl md:text-4xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-600"
            maxLength={1}
            onKeyDown={(event) =>
              handleInputKeyDown(event, input1Ref, undefined, input2Ref)
            }
            ref={input1Ref}
            value={guessedWord[0] || ""}
          />
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-12 md:w-24 mx-2 mb-2 text-center text-2xl md:text-4xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-600"
            maxLength={1}
            onKeyDown={(event) =>
              handleInputKeyDown(event, input2Ref, input1Ref, input3Ref)
            }
            ref={input2Ref}
            value={guessedWord[1] || ""}
          />
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-12 md:w-24 mx-2 mb-2 text-center text-2xl md:text-4xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-600"
            maxLength={1}
            onKeyDown={(event) =>
              handleInputKeyDown(event, input3Ref, input2Ref, input4Ref)
            }
            ref={input3Ref}
            value={guessedWord[2] || ""}
          />
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-12 md:w-24 mx-2 mb-2 text-center text-2xl md:text-4xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-600"
            maxLength={1}
            onKeyDown={(event) =>
              handleInputKeyDown(event, input4Ref, input3Ref, undefined)
            }
            ref={input4Ref}
            value={guessedWord[3] || ""}
          />
          </div>
          <div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded">
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
</div>
        </div>
      </div>
    </div>
  </section>
  );
}