"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";




export default function Leaderboard() {

  const topTenUsers = useQuery(api.users.getTopTenUsers);
  

  return (
    <section className="w-screen h-[75vh] flex flex-col items-center text-white mt-20">
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
            let place;
            if (index === 0) {
              place = (
                <svg
                  className="shine-star gold"
                  xmlns="http://www.w3.org/2000/svg"
                  height="25"
                  viewBox="0 0 512 512"
                  fill="#FFD700" // change fill color to gold
                >
                  <path d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"></path>
                </svg>
              );
            } else if (index === 1) {
              place = (
                <svg
                  className="shine-star silver"
                  xmlns="http://www.w3.org/2000/svg"
                  height="25"
                  viewBox="0 0 512 512"
                  fill="#C0C0C0"
                >
                  <path d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"></path>
                </svg>
              );
            } else if (index === 2) {
              place = (
                <svg
                  className="shine-star bronze"
                  xmlns="http://www.w3.org/2000/svg"
                  height="25"
                  viewBox="0 0 512 512"
                  fill="#CD7F32"
                >
                  <path d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"></path>
                </svg>
              );
            } else {
              place = `${index + 1}th`;
            }

            return (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-black/50"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="mr-2">
                    {place}
                    <div className="flex items-center">
                      <div className="parent-shine"></div>
                    </div>
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
