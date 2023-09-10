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

function AuthButton() {
  const { data: session } = useSession();

  const createUser = useMutation(api.users.createUser);

  const [showMenu, setShowMenu] = useState(false);
  const { scrollY } = useScroll();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (session?.user?.name) {
      createUser({
        username: session?.user?.name,
        image: session?.user?.image || "",
      });
    }
  }, [createUser, session?.user?.name, session?.user?.image]);

  const handleSignOut = () => {
    signOut();
  };

  if (!session) {
    return (
      <div className="flex gap-2 items-center">
        <button
          onClick={() => signIn()}
          className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline-block mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.698-2.782.603-3.369-1.338-3.369-1.338-.455-1.16-1.11-1.468-1.11-1.468-.908-.62.069-.607.069-.607 1.005.07 1.532 1.03 1.532 1.03.89 1.526 2.34 1.085 2.91.829.09-.645.35-1.085.636-1.335-2.22-.252-4.555-1.11-4.555-4.937 0-1.09.39-1.984 1.03-2.684-.103-.253-.448-1.274.098-2.65 0 0 .84-.27 2.75 1.025.8-.223 1.65-.334 2.5-.34.85.006 1.7.117 2.5.34 1.91-1.295 2.75-1.025 2.75-1.025.546 1.376.202 2.397.1 2.65.64.7 1.03 1.594 1.03 2.684 0 3.837-2.337 4.682-4.567 4.927.36.307.68.915.68 1.846 0 1.334-.013 2.41-.013 2.737 0 .267.18.58.69.48C17.138 18.165 20 14.418 20 10c0-5.523-4.477-10-10-10z"
              clipRule="evenodd"
            />
          </svg>
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="relative ">
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 focus:outline-none"
      >
        <Image
          src={session?.user?.image || "/default-avatar.png"}
          alt="User avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-gray-300 text-sm font-medium">
          {session?.user?.name}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <Link href="/profile">
            <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              View Profile
            </div>
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function Navbar() {
  const [mobileNav, setMobileNav] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

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
