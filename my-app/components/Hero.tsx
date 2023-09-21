"use client";

import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import CreateGameModal from "@/components/custom-ui/CreateGameModal";

export default function HeroSection() {
  const controls = useAnimation();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const handleAuth = () => {
    router.push(
      "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
    );
  };

  return (
    <motion.section
      className="relative"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="relative z-10 flex px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
        <div className="text-center">
          <h1 className="py-10 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl h1">
            <span className="block xl:inline ">
              How Good Are You at Guessing?
            </span>
          </h1>
          <p className="max-w-md py-5 mx-auto mt-3 text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Welcome to GuessGame, the ultimate guessing challenge where you can
            compete against other players to see who has the best guessing
            skills. With our competitive gameplay and simple interface, you can
            start playing in seconds and show off your skills. Play now and see
            if you have what it takes to be the best!
          </p>
          <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              {!session ? (
                <div>
                  <button
                    onClick={handleAuth}
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Play Now
                  </button>
                </div>
              ) : (
                <CreateGameModal />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
