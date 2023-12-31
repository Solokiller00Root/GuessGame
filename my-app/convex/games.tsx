import { action, internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

async function fetchWords(rounds: number) {
  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=${rounds}&length=5`
  );
  const data = await res.json();
  return data as string[];
}

export const createGame = action({
  args: {
    name: v.string(),
    owner: v.id("users"),
    privacy: v.string(),
    rounds: v.number(),
    password: v.union(v.string(), v.null()),
  },
  handler: async (ctx, { name, owner, privacy, rounds, password }) => {
    const words = await fetchWords(rounds);
    const roundsArr = new Array(rounds).fill({});
    for (let i = 0; i < roundsArr.length; i++) {
      const word = words[i];
      const wordArr = word.split("");
      const shuffledWord = wordArr.sort(() => Math.random() - 0.5);

      const brokenWord = shuffledWord
        .map((char, index) => {
          if (index === shuffledWord.length - 1) {
            return char;
          }
          return char + "-";
        })
        .join("");
      words[i] = brokenWord;
      roundsArr[i] = { word, status: "ongoing", brokenWord };
    }
    const gameId: Id<"games"> = await ctx
      .runMutation(internal.games.addGame, {
        name,
        owner,
        privacy,
        rounds: roundsArr,
        players: [{ id: owner, points: 0 }],
        password,
      })
      .then((res) => res as Id<"games">);
    return gameId;
  },
});

export const addGame = internalMutation({
  args: {
    name: v.string(),
    owner: v.id("users"),
    privacy: v.string(),
    rounds: v.array(
      v.object({
        word: v.string(),
        status: v.union(v.literal("ongoing"), v.literal("guessed")),
        brokenWord: v.string(),
      })
    ),
    players: v.array(v.object({ id: v.id("users"), points: v.number() })),
    password: v.union(v.string(), v.null()),
  },
  handler: async (ctx, { name, owner, privacy, rounds, players, password }) => {
    const gameId = await ctx.db.insert("games", {
      name,
      owner,
      privacy,
      logs: [],
      rounds,
      players,
      password,
      status: "waiting",
    });
    return gameId;
  },
});

export const getGameStatus = query({
  args: { gameId: v.id("games") },
  handler: async (ctx, { gameId }) => {
    const game = await ctx.db.get(gameId);
    if (game) {
      return game.status;
    }
  },
});

export const joinGame = mutation({
  args: {
    gameId: v.id("games"),
    userId: v.id("users"),
    password: v.optional(v.string()),
  },
  handler: async (ctx, { gameId, userId, password }) => {
    const game = await ctx.db.get(gameId);
    const user = await ctx.db.get(userId);

    if (game && user) {
      const players = game.players;
      if (!players.some((player) => player.id === user._id)) {
        players.push({ id: user._id, points: 0 });
        await ctx.db.patch(gameId, { players: players });
      }

      if (game.password === password) {
        return gameId;
      } else {
        return "Wrong password";
      }
    }
  },
});

export const getGameById = query({
  args: { gameId: v.id("games") },
  handler: async (ctx, { gameId }) => {
    const game = await ctx.db.get(gameId);
    game?.players.sort((a, b) => b.points - a.points);
    return game;
  },
});

export const checkGameIsValid = query({
  args: { gameId: v.any() },
  handler: async (ctx, { gameId }) => {
    const game = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("_id"), gameId))
      .collect();
    if (game.length > 0) {
      return true;
    }
    return false;
  },
});

export const getAllGames = query({
  handler: async (ctx) => {
    const games = await ctx.db.query("games").collect();
    return games;
  },
});

export const getGamePlayers = query({
  args: {
    players: v.array(v.object({ id: v.id("users"), points: v.number() })),
  },
  handler: async (ctx, { players }) => {
    const usersArr = await Promise.all(
      players.map(async (player) => {
        const userInfo = await ctx.db.get(player.id);
        return userInfo;
      })
    );
    return usersArr;
  },
});

export const updateGameStatus = mutation({
  args: {
    gameId: v.id("games"),
    status: v.union(
      v.literal("waiting"),
      v.literal("ongoing"),
      v.literal("finished")
    ),
  },
  handler: async (ctx, { gameId, status }) => {
    const game = await ctx.db.get(gameId);
    if (game) {
      if (status === "finished") {
        game.players.forEach(async (player) => {
          await ctx.scheduler.runAfter(100, internal.users.updatePlayerPoints, {
            userId: player.id,
            points: player.points,
          });
        });
      }
      await ctx.db.patch(gameId, { status: status });
    }
  },
});

export const updateRoundStatus = mutation({
  args: {
    gameId: v.id("games"),
    roundIndex: v.number(),
    status: v.union(v.literal("ongoing"), v.literal("guessed")),
  },
  handler: async (ctx, { gameId, roundIndex, status }) => {
    const game = await ctx.db.get(gameId);
    if (game) {
      const rounds = game.rounds;
      rounds[roundIndex].status = status;
      await ctx.db.patch(gameId, { rounds: rounds });
    }
  },
});

export const updateGameLogs = mutation({
  args: {
    gameId: v.id("games"),
    log: v.string(),
  },
  handler: async (ctx, { gameId, log }) => {
    const game = await ctx.db.get(gameId);
    if (game) {
      const logs = game.logs;
      logs.push(log);
      await ctx.db.patch(gameId, { logs: logs });
    }
  },
});

export const updateInGamePlayerPoints = mutation({
  args: {
    userId: v.id("users"),
    gameId: v.id("games"),
    points: v.number(),
  },
  handler: async (ctx, { userId, points, gameId }) => {
    const game = await ctx.db.get(gameId);
    if (game) {
      const players = game.players;
      const player = players.find((player) => player.id === userId);
      if (player) {
        player.points += points;
        await ctx.db.patch(gameId, { players: players });
      }
    }
  },
});


export const getUserGames = query({
  args: { userId: v.id("users")},
  handler: async (ctx, { userId }) => {
    const games = await ctx.db.query("games").filter((q) => q.eq(q.field("status"), "finished")).collect()
    const userGames = games.filter((game) => game.players.some((player) => player.id === userId));
    return userGames;
  },
});



export const getUserAveragePoints = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const games = await ctx.db.query("games").filter((q) => q.eq(q.field("status"), "finished")).collect();
    const userGames = games.filter((game) => game.players.some((player) => player.id === userId));
    const userPoints = userGames.map((game) => game.players.find((player) => player.id === userId)).filter((player) => player?.points !== undefined).map((player) => player!.points);
    const average = userPoints.reduce((a, b) => a + b, 0) / userPoints.length;
    if (isNaN(average)) {
      return 0;
    }
    return average.toFixed(1);
  },
});



