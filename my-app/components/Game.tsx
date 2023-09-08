"use client"
import React, { useState } from "react";

const fakePlayers =
    [
        { username: "slalom", points: 3 },
        { username: "wind", points: 1 },
        { username: "bruise", points: 4 },
        { username: "mountain", points: 0 },
        { username: "bountiful", points: 0 },
    ]

export default function Game() {
    const [guessedWord, setGuessedWord] = useState("")

    fakePlayers.sort((a, b) => a.points - b.points || a.username.localeCompare(b.username));

    const handlleGuessWord = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setGuessedWord("")
        //TODO: compare the guess wit the correct word
    }

    return (
        <section className="w-screen h-[75vh] flex justify-center items-center text-white">
            <div className="border bg-black/30 border-white rounded-xl w-3/5 h-4/5 game">
                <div className="border-r-2 border-white p-4 flex flex-col items-center justify-between">
                    <div className="text-xl">Game Leaderboard</div>
                    <div className="flex flex-col gap-2 flex-1 pt-10">
                        {fakePlayers.reverse().map((player) => {
                            return <div key={player.username} className="text-lg">
                                {player.username}: {player.points}
                            </div>
                        })}
                    </div>
                    <form onSubmit={handlleGuessWord}>
                        <div className="flex gap-2">
                            <input className="text-black w-full pl-1" type="text" value={guessedWord} name="guessedWordInput" onChange={(e) => setGuessedWord(e.target.value)} />
                            <input className="cursor-pointer hover:bg-red/90" type="submit" value="Enter" />
                        </div>
                    </form>
                </div>
                <h1 className="flex justify-center items-center">Word</h1>
            </div>
        </section>
    )
}