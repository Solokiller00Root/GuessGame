import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

type BurgerMenuPropsType = {
  mobileNav: boolean;
  setMobileNav: Dispatch<SetStateAction<boolean>>;
};

export default function BurgerMenu({mobileNav, setMobileNav}: BurgerMenuPropsType) {
  return (
    <motion.button
      initial="hide"
      animate={mobileNav ? "show" : "hide"}
      onClick={() => setMobileNav(prev => !prev)}
      className="relative z-20 flex flex-col space-y-1 lg:hidden md:hidden "
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
  );
}
