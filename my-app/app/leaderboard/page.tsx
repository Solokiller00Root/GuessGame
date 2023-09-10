"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Leaderboard() {
  const topTenUsers = useQuery(api.users.getTopTenUsers);

  return (
    <section className="w-screen h-[75vh] flex flex-col justify-center items-center text-white">
      <h1>Leaderboard</h1>

      <table className="min-w-max w-3/5 text-white-800 table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Place</th>
            <th className="py-3 px-6 text-left">Player</th>
            <th className="py-3 px-6 text-center">Points</th>
          </tr>
        </thead>
        <tbody className="text-white text-sm font-light">
          {topTenUsers?.map((user, index) => {
            return (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-black/50"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">{index + 1}</div>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <Image
                        className="w-6 h-6 rounded-full"
                        alt="User Avatar"
                        src={user.image}
                        width={6}
                        height={6}
                      />
                    </div>
                    <span>{user.username}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                    {user.points}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
