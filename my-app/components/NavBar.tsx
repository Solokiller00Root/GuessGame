'use client'


import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
	const [mobileNav, setMobileNav] = useState(false);

	const toggleMobileNav = () => {
		setMobileNav(!mobileNav);
	};

	return (
		<header className="sticky inset-x-0 top-0 p-6 bg-black/30 lg:hidden md:hidden">
			<nav className="container flex justify-between mx-auto">
				<motion.button
					initial="hide"
					animate={mobileNav ? "show" : "hide"}
					onClick={toggleMobileNav}
					className="relative z-10 flex flex-col space-y-1"
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
								className="fixed inset-0 bg-[#170b25] p-6 flex flex-col justify-center space-y-10 lg:hidden"
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
											Link #1
										</a>
									</li>
									<li>
										<a href="#" className="text-5xl font-semibold text-white">
											Link #2
										</a>
									</li>
									<li>
										<a href="#" className="text-5xl font-semibold text-white">
											Link #3
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
									<button>
										<div className="bg-white rounded-lg  ">Sign in with github</div>
									</button>
									
									
								</motion.ul>
							</motion.div>

						</MotionConfig>
					)}
				</AnimatePresence>
				<Image src="/assets/logoForGuessGame.png" width={200} height={200} alt="Logo" className="w-[140px] h-[140px] " />
			</nav>
		</header>
	);
}