'use client'


import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AvailableLobbies() {
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const titleTop = titleRef.current.getBoundingClientRect().top;
        const titleBottom = titleRef.current.getBoundingClientRect().bottom;
        const titleVisible = titleTop < window.innerHeight && titleBottom >= 0;
        setIsTitleVisible(titleVisible);
      }
      if (tableRef.current) {
        const tableTop = tableRef.current.getBoundingClientRect().top;
        const tableBottom = tableRef.current.getBoundingClientRect().bottom;
        const tableVisible = tableTop < window.innerHeight && tableBottom >= 0;
        setIsTableVisible(tableVisible);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const titleVariants = {
    hidden: {
      y: -50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const tableVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.2,
      },
    },
  };

  return (
    <div className="flex flex-col h-screen justify-start items-center bg-{#1d0c33} container-lobbies font-sans ">
      <motion.h1
        className="text-4xl font-bold mt-8 mb-4 py-10 text-white "
        variants={titleVariants}
        initial="hidden"
        animate={isTitleVisible ? "visible" : "hidden"}
        ref={titleRef}
      >
        Available Lobbies:
      </motion.h1>
      <div className="overflow-x-auto">
        <motion.table
          className="w-full max-w-md sm:max-w-full border-collapse tables border border-gray-300 sm:rounded-lg"
          variants={tableVariants}
          initial="hidden"
          animate={isTableVisible ? "visible" : "hidden"}
          ref={tableRef}
        >
          <thead>
            <tr>
              <th className="bg-gray-200 py-2 px-4 border border-gray-300 text-gray-700 font-bold uppercase tracking-wider text-lg">
                Lobby Name
              </th>
              <th className="bg-gray-200 py-2 px-4 border border-gray-300 text-gray-700 font-bold uppercase tracking-wider text-lg">
                Players
              </th>
              <th className="bg-gray-200 py-2 px-4 border border-gray-300 text-gray-700 font-bold uppercase tracking-wider text-lg">
                Status
              </th>
              <th className="bg-gray-200 py-2 px-4 border border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100 hover:bg-gray-200">
              <td className="py-2 px-4 border border-gray-300 text-lg">Lobby 1</td>
              <td className="py-2 px-4 border border-gray-300 text-lg">4/8</td>
              <td className="py-2 px-4 border border-gray-300 text-green-600 font-bold text-lg">
                Open
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Join
                </button>
              </td>
            </tr>
            <tr className="bg-gray-100 hover:bg-gray-200">
              <td className="py-2 px-4 border border-gray-300 text-lg">Lobby 2</td>
              <td className="py-2 px-4 border border-gray-300 text-lg">2/6</td>
              <td className="py-2 px-4 border border-gray-300 text-green-600 font-bold text-lg">
                Open
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Join
                </button>
              </td>
            </tr>
            <tr className="bg-gray-100 hover:bg-gray-200">
              <td className="py-2 px-4 border border-gray-300 text-lg">Lobby 3</td>
              <td className="py-2 px-4 border border-gray-300 text-lg">1/4</td>
              <td className="py-2 px-4 border border-gray-300 text-red-600 font-bold text-lg">
                Closed
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled
                >
                  Join
                </button>
              </td>
            </tr>
          </tbody>
        </motion.table>
      </div>
    </div>
  );
}


