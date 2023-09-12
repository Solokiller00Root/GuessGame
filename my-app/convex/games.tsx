import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getRandomWord = action({
  args: { rounds: v.number() },
  handler: async (ctx, args) => {
    const res = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${args.rounds}`
    );
    const data = await res.json();
    return data;
  },
});

export const createGame = mutation({
  args: {
    name: v.string(),
    owner: v.id("users"),
    privacy: v.string(),
    rounds: v.number(),
    words: v.array(v.string()),
    players: v.array(v.id("users")),
    password: v.union(v.string(), v.null()),
  },
  handler: async (ctx, { name, owner, privacy, rounds, password, words }) => {
    const roundsArr = new Array(rounds).fill({});
    for (let i = 0; i < roundsArr.length; i++) {
      roundsArr[i] = { word: words[i], status: "ongoing" };
    }
    const gameId = await ctx.db.insert("games", {
      name,
      owner,
      privacy,
      logs: [],
      rounds: roundsArr,
      status: "waiting",
      players: [owner],
      password,
    });
    return gameId;
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
      if (!players.some((player) => player === user._id)) {
        players.push(user._id);
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
    if (!game) {
      return null;
    }
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
  args: { players: v.array(v.id("users")) },
  handler: async (ctx, { players }) => {
    const usersArr = await Promise.all(
      players.map(async (playerId) => {
        const userInfo = await ctx.db.get(playerId);
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
