"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "./custom-ui/navbar/AuthButton";
import BurgerMenu from "./custom-ui/navbar/BurgerMenu";
import GuessLogo from "./custom-ui/navbar/GuessLogo";

const links = [
  { title: "Join Game", url: "/#games" },
  { title: "Leaderboard", url: "/leaderboard" },
  { title: "Rules", url: "/rules"},
  
];

export default function Navbar() {
  const [mobileNav, setMobileNav] = useState(false);
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

  const closeNav = () => {
    setMobileNav(false);
  };

  return (
    <header className="sticky inset-x-0 top-0 z-50 p-6 ">
      <nav className="sticky inset-x-0 top-0 z-30 flex justify-between p-6 mx-auto container-navbar lg:hidden md:hidden bg-black/30 ">
        <BurgerMenu mobileNav={mobileNav} setMobileNav={setMobileNav} />
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
                  className="space-y-6 list-none "
                >
                  {links.map((link, index) => (
                    <Link key={index} href={link.url} onClick={closeNav}>
                      <li>
                        <div className="text-5xl font-semibold text-white ">
                          {link.title}
                        </div>
                      </li>
                    </Link>
                  ))}
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
          <GuessLogo />
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
        className="sticky inset-x-0 top-0 z-20 p-6 bg-black/30 max-md:hidden"
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
            <nav className=" max-md:hidden">
              <div className="flex items-center justify-between h-20 ">
                <Link href={"/"}>
                  <Image
                    src="/assets/logoForGuessGame.png"
                    alt="logo"
                    width={200}
                    height={200}
                    className=""
                  />
                </Link>
                <ul className="flex justify-between gap-10 flex-3 max-lg:gap-4 ">
                  {links.map((link, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-lg font-semibold text-white cursor-pointer"
                    >
                      <Link href={link.url}>
                        <div className=" inline-block bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 hover:bg-[#8e2de2] hover:text-gray-100 hover:border-gray-100">
                          {link.title}
                        </div>
                      </Link>
                    </motion.button>
                  ))}
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
