"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";



export default function Navbar() {
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    if (isClicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isClicked]);

  function toggleLines() {
    setIsClicked(!isClicked);
  }

  const items = {
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <div
        className={`container-lines ${isClicked ? "x" : ""}`}
        onClick={toggleLines}
      >
        <div className="first-line"></div>
        <div className="second-line"></div>
      </div>

      <AnimatePresence>
        {isClicked && (
          <motion.div
            variants={items}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            exit="exit"
          >
            <div className="container-links">
              <ul className="wrapper">
                <motion.div
                  variants={items}
                  initial={{ y: 90, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 2 }}
                  exit={{
                    opacity: 0,
                    y: 90,
                    transition: {
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <motion.div
                    variants={items}
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      opacity: 0,
                      y: 90,
                      transition: {
                        duration: 0.1,
                        ease: "easeInOut",
                        delay: 0.1,
                      },
                    }}
                    exit={{ y: 90, opacity: 0 }}
                  >
                    <li>
                      <a href="#">Home</a>
                    </li>
                  </motion.div>

                  <motion.div
                    variants={items}
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      opacity: 0,
                      y: 90,
                      transition: {
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.2,
                      },
                    }}
                    exit={{ y: 90, opacity: 0 }}
                  >
                    <li>
                      <a href="#">About</a>
                    </li>
                  </motion.div>
                  <motion.div
                    variants={items}
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      opacity: 0,
                      y: 90,
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut",
                        delay: 0.3,
                      },
                    }}
                    exit={{ y: 90, opacity: 0 }}
                  >
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </motion.div>
                </motion.div>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
