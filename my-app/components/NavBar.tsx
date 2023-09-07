'use client'


import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";



function AuthButton() {
	const { data: session } = useSession();
  
	if (session) {
	  return (
		<>
		  <span className="text-gray-300">{session?.user?.name}</span>
		  <button
			onClick={() => signOut()}
			className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
		  >
			Sign out
		  </button>
		</>
	  );
	}
  
	return (
	  <>
		<span className="text-gray-300">Not signed in</span>
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
	  </>
	);
  }
export default function Navbar() {
	const [mobileNav, setMobileNav] = useState(false);

	const toggleMobileNav = () => {
		setMobileNav(!mobileNav);
	};

	return (
		<header className="sticky inset-x-0 top-0 p-6 bg-black/30 lg:hidden md:hidden relative">
			<nav className="container flex justify-between mx-auto ">
				
				<motion.button
					initial="hide"
					animate={mobileNav ? "show" : "hide"}
					onClick={toggleMobileNav}
					className="relative  flex flex-col space-y-1 z-20 "
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
							transition={{
								type: "spring",
								bounce: 0.1,
							}}
						>
							<motion.div
								key="mobile-nav"
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
								className="fixed inset-0 bg-[#170b25] p-6 flex flex-col justify-center space-y-10 lg:hidden z-10"
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
									<li>
										<a href="#" className="text-5xl font-semibold text-white">
											Leaderboards
										</a>
									</li>
									<li>
										<a href="#" className="text-5xl font-semibold text-white">
											Join Game
										</a>
									</li>
									<li>
										<a href="#" className="text-5xl font-semibold text-white">
											Create Game
										</a>
									</li>
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
						className="absolute top-0 right-0  -mt-11  z-2 image "	
					/>
					</Link>
					</motion.button>
				</AnimatePresence>
			</nav>
			
		</header>
	);
}