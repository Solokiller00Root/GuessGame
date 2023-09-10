import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ isOpen, onClose }: ModalProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const user = useQuery(api.users.getUserByUsername, {
    username: session?.user?.name || "",
  });
  const createGame = useMutation(api.games.createGame);

  async function handlleCreateGame(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const gameName = e.target.elements.name.value;
    const roundsNumber = Number(e.target.elements.rounds.value);
    const privacy = e.target.elements.public.checked ? "public" : "private";
    if (user) {
      const gameId = await createGame({
        name: gameName,
        owner: user._id,
        privacy: privacy,
        rounds: roundsNumber,
        status: "waiting",
        players: [user._id],
      });
      router.push(`/play/${gameId}`);
    }
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handlleCreateGame}>
          <DialogHeader>
            <DialogTitle>Ceate Game</DialogTitle>
            <DialogPrimitive.Close
              onClick={onClose}
              className="absolute CrossX  right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-stone-100 data-[state=open]:text-stone-500 dark:ring-offset-stone-950 dark:focus:ring-stone-300 dark:data-[state=open]:bg-stone-800 dark:data-[state=open]:text-stone-400"
            >
              <X className="w-4 h-4 bg-white" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name">Lobby Name</Label>
              <input
                id="name"
                minLength={5}
                maxLength={20}
                placeholder="Eagles"
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="rounds">Number of rounds</Label>
              <input
                type="number"
                placeholder="5"
                id="rounds"
                defaultValue={5}
                min={1}
                max={10}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="private">Privacy</Label>
              <div className="flex col-span-3 gap-x-4">
                <div className="flex items-center gap-x-1">
                  <input
                    id="private"
                    type="radio"
                    name="privacy"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800"
                  />
                  <Label htmlFor="private">Private</Label>
                </div>
                <div className="flex items-center gap-x-1">
                  <input
                    id="public"
                    defaultChecked
                    type="radio"
                    name="privacy"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800"
                  />
                  <Label htmlFor="public">Public</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Lobby</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
