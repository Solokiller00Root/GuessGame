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

export const joinGame = mutation({
args:{ 
  gameId: v.id("games"),
  userId: v.id("users"),
  password: v.optional(v.string()),
},
handler: async (ctx, { gameId, userId,  password}) => {
  const game = await ctx.db.get(gameId);
  const user = await ctx.db.get(userId);

  if( game && user) {
    const players = game.players
    if (!players.some((player) => player === user._id)) {
      players.push(user._id)
      await ctx.db.patch(gameId, { players: players });
    }

    if (game.password === password) {
      return gameId
    }
    else {
      return "Wrong password"
    }
    
}
}
});



export const getGameById = query({
  args: { gameId: v.id("games")
 },
  handler: async (ctx, { gameId }) => {
    const game = await ctx.db.get(gameId);
    if(!game ) {
      return null
    }
    return game;
  },
});

export const getAllGames = query({
  handler: async (ctx) => {
    const games = await ctx.db.query("games").collect();
    return games
  }}
  );