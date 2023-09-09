"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Profile() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <section className="w-screen h-[75vh] flex justify-center items-center text-white">
        <h1 className="text-white">Not Logged in!</h1>
      </section>
    );
  }

  return (
    <section className="w-screen h-[75vh] flex justify-center items-center text-white">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-full"
            src={session.user?.image || ""}
            alt="Profile Avatar"
            width={50}
            height={50}
          />
          <h1>{session.user?.name}</h1>
        </div>
        <div>
          {session.user ? <UserInfo username={session.user?.name} /> : null}
        </div>
      </div>
    </section>
  );
}

function UserInfo({ username }: { username: string | null | undefined }) {
  const user = useQuery(api.user.getUserByUsername, {
    username: username || "",
  });
  return <h1>Points: {user?.points}</h1>;
}
