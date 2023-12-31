import { useState, FormEvent } from "react";
import { useMutation, useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Modal from "./Modal";

type JoinGameModalPropsType = {
  gameId: Id<"games">;
};

export default function JoinGameModal({ gameId }: JoinGameModalPropsType) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { data: session } = useSession();
  const router = useRouter();

  const game = useQuery(api.games.getGameById, { gameId: gameId });
  const user = useQuery(api.users.getUserByUsername, {
    username: session?.user?.name ?? "",
  });
  const joinGame = useMutation(api.games.joinGame);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (game?.password === password && user) {
      await joinGame({ gameId, userId: user?._id, password: "" });
      router.push(`/play/${gameId}`);
    } else {
      setError("Invalid password");
    }
  };

  const joinPublicGame = async () => {
    if (game?.privacy === "public" && user) {
      await joinGame({ gameId, userId: user?._id, password: "" });
      router.push(`/play/${gameId}`);
    }
  };

  if (game?.privacy === "public") {
    return (
      <button
        onClick={joinPublicGame}
        className="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Join
      </button>
    );
  }

  const joinGameIfAlreadyJoined = async () => {
    if (
      game &&
      user &&
      game.players.find((player) => player.id === user?._id)
    ) {
      router.push(`/play/${gameId}`);
    }
  };

  return (
    <Modal
      triggerButton={
        <button
          onClick={joinGameIfAlreadyJoined}
          className="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Join
        </button>
      }
      title="Join Game"
      description="Enter password to join game"
    >
      <form onSubmit={submitHandler}>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          className="col-span-3"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <DialogFooter className="mt-4">
          <Button type="submit">Join Lobby</Button>
        </DialogFooter>
      </form>
    </Modal>
  );
}
