"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Profile() {
  const { data: session } = useSession();
  
  const user = useQuery(api.users.getUserByUsername, {
    username: session?.user?.name || "",
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
            <Image
              className="rounded-full"
              src={user.image}
              alt="Profile Avatar"
              width={50}
              height={50}
            />
            <h1>{user.username}</h1>
          </div>
          <div>
            <h1>Points: {user.points}</h1>
          </div>
        </div>
      ) : (
        <h1 className="text-white">Loading User Info...</h1>
      )}
    </section>
  );
}
