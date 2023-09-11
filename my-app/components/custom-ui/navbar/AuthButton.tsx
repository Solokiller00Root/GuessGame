import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useMutation } from "convex/react";
import Image from "next/image";
import Link from "next/link";

import { api } from "@/convex/_generated/api";

export default function AuthButton() {
    const [showMenu, setShowMenu] = useState(false);

  const { data: session } = useSession();

  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (session?.user?.name) {
      createUser({
        username: session?.user?.name,
        image: session?.user?.image || "",
      });
    }
  }, [createUser, session?.user?.name, session?.user?.image]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleShowMenu = () => {
    setShowMenu(false);
  };

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
            <div
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleShowMenu}
            >
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
