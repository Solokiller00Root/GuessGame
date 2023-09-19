
export default function Rules() {
  return (
    <div className="flex justify-center items-center ">
      <div className="max-w-md mx-auto my-10  bg-[#9c4cd4]  rounded-md shadow-sm">
        <h1 className="text-2xl font-bold mb-5 flex justify-center items-center">Rules</h1>
        <ul className="list-disc pl-5">
            <li>1. The player who guesses the correct word wins the round and earns a point.</li>
            <li>2. The points that the player gets in game are the points he has in Leaderboard.</li>
            <li>3. There is no time limit so that the players have time to think.</li>
            <li>4. Players have unlimited guesses.</li>
            <li>5. The players that can be in one game are maximum 5.</li>
            <li>6. In order to start the game the lobby needs at least 3/5 players.</li>
            <li>7. Only owner can start the game.</li>
            <li>8. Players cant join after the game has started.</li>
            <li>9. Enjoy the game!!!</li>
        </ul>
      </div>
    </div>
  );
}