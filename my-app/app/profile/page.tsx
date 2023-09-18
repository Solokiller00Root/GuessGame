'use client'

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";


export default function Profile() {
  const { data: session } = useSession();

  const user = useQuery(api.users.getUserByUsername, {
    username: session?.user?.name || "",
  });

  const getUserGames = useQuery(api.games.getUserGames , {
    userId:  user?._id || "" as Id<"users">,
  });

  const getUserAveragePoints = useQuery(api.games.getUserAveragePoints, {
    userId:  user?._id || "" as Id<"users">,
  });

  if (!session) {
    return (
      <section className="w-screen h-[75vh] flex justify-center items-center text-white">
        <h1 className="text-white">Not Logged in!</h1>
      </section>
    );
  }

  return (
    <section className="w-screen h-[75vh] flex justify-center items-center text-white">
      {user ? (
        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-4 items-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                className="object-cover w-full h-full"
                src={user.image}
                alt="Profile Avatar"
                layout="fill"
              />
            </div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
          </div>
          <div>
            <h1 className="text-lg font-medium">Points: {user.points}</h1>
          </div>
          <div className="border-t-2 border-b-2 border-gray-300 w-full py-2">
            <h1 className="text-lg font-medium">Games Played: {getUserGames?.length}</h1>
          </div>
          <div className="border-b-2 border-gray-300 w-full py-2">
            <h1 className="text-lg font-medium">Average Points: {getUserAveragePoints}</h1>
          </div>
          <div className="w-full py-2">
            <h1 className="text-lg font-medium"> </h1>
          </div>
        </div>
      ) : (
        <h1 className="text-white">Loading User Info...</h1>
      )}
    </section>
  );
}