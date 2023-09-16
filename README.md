# GuessGame Readme

Welcome to GuessGame, a project developed for the WebDevCody Hackathon! GuessGame is an interactive word-guessing game where you can create lobbies, invite friends, and compete to unscramble words as fast as possible. This readme will provide an overview of the project, its features, and how to get started.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [License](#license)

## Overview

GuessGame is a real-time multiplayer word unscramble game designed for both desktop and mobile devices. Players can create lobbies, join existing ones, and compete to solve word puzzles. Here's a brief overview of the project:

- **Create Lobbies:** Players can create public or private lobbies. Private lobbies are password-protected, allowing you to play with friends exclusively.

- **Multiplayer Fun:** Invite your friends to join your lobby, and once you have three or more players, the game can begin.

- **Word Unscramble:** Each round presents players with a scrambled word. Your goal is to unscramble it and type the correct word as quickly as possible.

- **Scoring:** The first player to correctly unscramble the word scores points.

- **Leaderboard:** Keep track of your performance by viewing your place on the leaderboard. See how you stack up against other players.

- **Profile Stats:** Check out your profile page to view your stats.

## Features

GuessGame comes with the following features:

- Lobby creation with options for public or private lobbies.
- Real-time multiplayer gameplay with a minimum of three players to start a game.
- Word unscramble rounds with randomized words.
- Scoring system to reward the fastest word unscramblers.
- Leaderboard to showcase the top players.
- Profile pages to view personal game stats.
- Responsive design for desktop and mobile devices.

## Tech Stack

GuessGame is built using the following technologies:

- [Next.js](https://nextjs.org/) - A React framework for building web applications.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for styling the user interface.
- [NextAuth.js](https://next-auth.js.org/) - Authentication library for Next.js applications.
- [Covex](https://www.convex.dev/) - For real-time data synchronization and database management.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript.

## Getting Started

To get started with GuessGame, follow these steps:

1. Clone the repository to your local machine.

2. Install the project dependencies using npm:

   ```bash
   npm install
3. Configure your Convex credentials and authentication settings. You'll need to set up Convex to manage real-time data and authentication.
4. Start the development server:

    ```bash
    npm run dev && npx convex dev

5. Open your browser and visit http://localhost:3000 to access the GuessGame application.

## License
GuessGame is licensed under the MIT License. You are free to use and modify this project for your purposes, subject to the terms of the license.

Enjoy playing GuessGame and have fun competing with your friends! If you have any questions or encounter issues, please feel free to reach out to us. Happy coding!