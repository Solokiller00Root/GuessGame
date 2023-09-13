import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-4">
      <div className="container mx-auto flex justify-center items-center">
        <a
          href="https://github.com/Solokiller00Root/GuessGame/tree/dev/my-app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-300"
        >
          <FaGithub size={24} />
        </a>
        <span className="text-gray-400 mx-4">|</span>
        <span className="text-gray-400">
          
          &copy; {new Date().getFullYear()} GuessGame
        </span>
      </div>
    </footer>
  );
}
