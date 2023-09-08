
'use client'



import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import lottie from "lottie-web";

export default function HeroSection() {
  const controls = useAnimation();
  const { data: session } = useSession();
  const router = useRouter();

  const container1 = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container1.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("@/public/assets/questionAni.json"),
    });
  }, []);


useEffect(() => {
    controls.start("visible");
  }, [controls]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const handlePlayNowClick = () => {
    if (!session) {
      router.push("/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F");
    } else {
        router.push("/play");
    }
  };

  return (
    <motion.section
      className="relative"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex  ">
        <div className="text-center">
          
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl py-10 h1">
            <span className="block xl:inline ">
              How Good Are You at Guessing?
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl py-5">
            Welcome to GuessGame, the ultimate guessing challenge where you can
            compete against other players to see who has the best guessing
            skills. With our competitive gameplay and simple interface, you can
            start playing in seconds and show off your skills. Play now and see
            if you have what it takes to be the best!
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                onClick={handlePlayNowClick}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Play Now
              </button>
            </div>
          </div>
        </div>
      
      </div>
      
    </motion.section>
  );
}