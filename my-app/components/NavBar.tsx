"use client";

import { useMutation, useQuery } from "convex/react";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/convex/_generated/api";
import AuthButton from './custom-ui/AuthButton';


export default function Navbar() {
  const [mobileNav, setMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setMobileNav(!mobileNav);
  };
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <header className="sticky inset-x-0 top-0 p-6  z-50  ">
      <nav className="container-navbar flex justify-between mx-auto lg:hidden md:hidden sticky inset-x-0 top-0 p-6 bg-black/30 z-30 ">
        <motion.button
          initial="hide"
          animate={mobileNav ? "show" : "hide"}
          onClick={toggleMobileNav}
          className="relative  flex flex-col space-y-1 z-20 lg:hidden md:hidden "
        >
          <motion.span
            variants={{
              hide: {
                rotate: 0,
              },
              show: {
                rotate: 45,
                y: 5,
              },
            }}
            className="block w-6 h-px bg-white"
          ></motion.span>
          <motion.span
            variants={{
              hide: {
                opacity: 1,
              },
              show: {
                opacity: 0,
              },
            }}
            className="block w-6 h-px bg-white"
          ></motion.span>
          <motion.span
            variants={{
              hide: {
                rotate: 0,
              },
              show: {
                rotate: -45,
                y: -5,
              },
            }}
            className="block w-6 h-px bg-white"
          ></motion.span>
        </motion.button>

        <AnimatePresence>
          {mobileNav && (
            <MotionConfig
              key={"mobile-nav"}
              transition={{
                type: "spring",
                bounce: 0.1,
              }}
            >
              <motion.div
                variants={{
                  hide: {
                    x: "-100%",
                    transition: {
                      type: "spring",
                      bounce: 0.1,
                      when: "afterChildren",
                      staggerChildren: 0.25,
                    },
                  },

                  show: {
                    x: "0%",
                    transition: {
                      type: "spring",
                      bounce: 0.1,
                      when: "beforeChildren",
                      staggerChildren: 0.25,
                    },
                  },
                }}
                initial="hide"
                animate="show"
                exit="hide"
                className="fixed inset-0 bg-[#170b25] p-6 flex flex-col justify-center space-y-10 lg:hidden z-10 "
              >
                <motion.ul
                  variants={{
                    hide: {
                      y: "25%",
                      opacity: 0,
                    },
                    show: {
                      y: "0%",
                      opacity: 1,
                    },
                  }}
                  className="space-y-6 list-none  "
                >
                  <Link href={"/leaderboard"}>
                    <li>
                      <div className="text-5xl font-semibold text-white ">
                        Leaderboards
                      </div>
                    </li>
                  </Link>
                  <Link href={"/"}>
                    <li>
                      <div className="text-5xl font-semibold text-white">
                        Join Game
                      </div>
                    </li>
                  </Link>
                  <Link href={"/"}>
                    <li>
                      <div className="text-5xl font-semibold text-white">
                        Create Game
                      </div>
                    </li>
                  </Link>
                </motion.ul>
                <motion.div
                  variants={{
                    hide: {
                      y: "25%",
                      opacity: 0,
                    },
                    show: {
                      y: "0%",
                      opacity: 1,
                    },
                  }}
                  className="w-full h-px bg-white/30"
                ></motion.div>
                <motion.ul
                  variants={{
                    hide: {
                      y: "25%",
                      opacity: 0,
                    },
                    show: {
                      y: "0%",
                      opacity: 1,
                    },
                  }}
                  className="flex justify-center list-none gap-x-4"
                >
                  <AuthButton />
                </motion.ul>
              </motion.div>
            </MotionConfig>
          )}

          <motion.button>
            <Link href="/">
              <Image
                src="/assets/logoForGuessGame.png"
                alt="logo"
                width={100}
                height={100}
                className="absolute -top-10 right-10 z-2 image -mt-1 -mr-11 "
              />
            </Link>
          </motion.button>
        </AnimatePresence>
      </nav>
      <motion.header
        variants={{
          visible: {
            y: 0,
            opacity: 1,
          },
          hidden: {
            y: "-100%",
            opacity: 0,
          },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="sticky inset-x-0 top-0 p-6 bg-black/30 z-20 max-md:hidden"
      >
        <header className="">
          <motion.nav
            variants={{
              visible: {
                y: 0,
                opacity: 1,
              },
              hidden: {
                y: "-100%",
                opacity: 0,
              },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <nav className="  max-md:hidden ">
              <div className="flex justify-between items-center h-20   ">
                <Link href={"/"}>
                  <Image
                    src="/assets/logoForGuessGame.png"
                    alt="logo"
                    width={200}
                    height={200}
                    className=""
                  />
                </Link>
                <ul className="flex flex-3 justify-between gap-10 max-lg:gap-4 ">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white text-lg font-semibold cursor-pointer"
                  >
                    <Link href={"/leaderboard"}>
                      <div className=" inline-block bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 hover:bg-[#8e2de2] hover:text-gray-100 hover:border-gray-100">
                        Leaderboards
                      </div>
                    </Link>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white text-lg font-semibold cursor-pointer"
                  >
                    <Link href="/" className="Links">
                      <div className=" inline-block bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 hover:bg-[#8e2de2] hover:text-gray-100 hover:border-gray-100">
                        Join Game
                      </div>
                    </Link>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white text-lg font-semibold cursor-pointer"
                  >
                    <Link href="/" className="Links">
                      <div className="nav__link inline-block bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 hover:bg-[#8e2de2] hover:text-gray-100 hover:border-gray-100">
                        Create Game
                      </div>
                    </Link>
                  </motion.button>
                </ul>

                <AuthButton />
              </div>
            </nav>
          </motion.nav>
        </header>
      </motion.header>
    </header>
  );
}
