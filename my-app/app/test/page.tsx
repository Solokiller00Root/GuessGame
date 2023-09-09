"use client"
import React, { useState } from "react";
import Image from "next/image";

const fakePlayers =
    [
        { username: "slalom", points: 3, avatar: 'lego.jpg' },
        { username: "wind", points: 1, avatar: 'lego.jpg' },
        { username: "bruise", points: 4, avatar: 'lego.jpg' },
        { username: "mountain", points: 0, avatar: 'lego.jpg' },
        { username: "bountiful", points: 0, avatar: 'lego.jpg' },
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
            <div className="border bg-black/30 border-white rounded-xl w-3/5 game">
                <div className="border-r-2 border-white flex flex-col items-center justify-between">
                    <div className="text-xl pt-4 pb-6 font-bold">Game Leaderboard</div>
                    <div className="flex flex-col w-full flex-1 overflow-auto max-h-[312px] px-3 leaderboard">
                        {fakePlayers.reverse().map((player, i) => {
                            return <div key={player.username} className="text-lg flex py-3 px-4 singlePlayerStat">
                                <h4 className="text-xl font-semibold">{i+1}.</h4>
                                <div className="px-4">
                                <Image className="rounded-full" src={`/assets/${player.avatar}`} width={32} height={32} alt={player.username} />
                                    </div>
                                <p>
                                {player.username}
                                </p>
                                <p className="ml-auto text-xl font-semibold">
                                {player.points}
                                </p>
                            </div>
                        })}
                    </div>
                    <form className="w-full pt-6" onSubmit={handlleGuessWord}>
                        <div className="flex gap-2 relative">
                            <input className="text-black w-full pl-3 py-3 rounded-xl" type="text" value={guessedWord} name="guessedWordInput" onChange={(e) => setGuessedWord(e.target.value)} />
                            {/* <input className="cursor-pointer hover:bg-red/90" type="submit" value="Enter" /> */}
                            <input className="absolute right-0 cursor-pointer inline-block bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] text-white font-semibold py-3 px-4  transition-all duration-300 shadow-md hover:shadow-lg  hover:bg-[#8e2de2] hover:text-gray-100 hover:border-gray-100" type="submit" value="Enter" />
                        </div>
                    </form>
                </div>
                <h1 className="flex justify-center items-center">Word</h1>
            </div>
        </section>
    )
}