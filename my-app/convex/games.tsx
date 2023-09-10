import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createGame = mutation({
  args: {
    name: v.string(),
    owner: v.id("users"),
    privacy: v.string(),
    rounds: v.number(),
    status: v.string(),
    players: v.array(v.id("users")),
    password: v.string(),
  },
  handler: async (ctx, { name, owner, privacy, rounds, password }) => {
    const roundsArr = new Array(rounds).fill({});
    roundsArr.forEach((round) => {
      round.word = "word";
      round.status = "waiting";
    });
    const gameId = await ctx.db.insert("games", {
      name,
      owner,
      privacy,
      rounds: roundsArr,
      status: "waiting",
      players: [owner],
      password: password,
    });
    return gameId;
  },
});
