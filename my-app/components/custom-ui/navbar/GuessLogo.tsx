import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function GuessLogo() {
  return (
    <motion.button>
      <Link href="/">
        <Image
          src="/assets/logoForGuessGame.png"
          alt="logo"
          width={100}
          height={100}
          className="absolute -mt-1 -top-10 right-10 z-2 image -mr-11 "
        />
      </Link>
    </motion.button>
  );
}
