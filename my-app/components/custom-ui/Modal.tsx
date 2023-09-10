import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormDataType = {
  gameName: string;
  privacy: "private" | "public";
  rounds: number;
  password: string;
};

export default function Modal() {
  const [formData, setFormData] = useState<FormDataType>({
    gameName: "",
    privacy: "private",
    rounds: 0,
    password: "",
  });
  const { data: session } = useSession();
  const router = useRouter();
  const user = useQuery(api.users.getUserByUsername, {
    username: session?.user?.name || "",
  });
  const createGame = useMutation(api.games.createGame);

  const updateFormData = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      const gameId = await createGame({
        name: formData.gameName,
        owner: user._id,
        privacy: formData.privacy,
        rounds: formData.rounds,
        status: "waiting",
        players: [user._id],
        password: formData.password,
      });
      router.push(`/play/${gameId}`);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
          Play Now
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ceate Game</DialogTitle>
          <DialogDescription>Choose options to start game</DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name">Lobby Name</Label>
              <Input
                id="name"
                placeholder="Eagles"
                className="col-span-3"
                onChange={(e) => updateFormData("gameName", e.target.value)}
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="rounds">Number of rounds</Label>
              <Input
                type="number"
                placeholder="5"
                id="rounds"
                className="col-span-3"
                onChange={(e) => updateFormData("rounds", +e.target.value)}
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="text"
                placeholder="12345"
                id="password"
                className="col-span-3"
                onChange={(e) => updateFormData("password", e.target.value)}
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="private">Privacy</Label>
              <div
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateFormData("privacy", e.target.value)
                }
                className="flex col-span-3 gap-x-4"
              >
                <div className="flex items-center gap-x-1">
                  <input
                    id="private"
                    type="radio"
                    value="private"
                    name="radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800"
                  />
                  <Label htmlFor="private">Private</Label>
                </div>
                <div className="flex items-center gap-x-1">
                  <input
                    id="public"
                    type="radio"
                    value="public"
                    name="radio"
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
