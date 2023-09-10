import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: { username: v.string(), image: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.username))
      .first();
    if (!users) {
      await ctx.db.insert("users", {
        username: args.username,
        image: args.image,
        points: 0,
      });
    }
  },
});

export const getUserByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.username))
      .first();
    return users;
  },
});

export const getTopTenUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const topTenUsers = users.sort((a, b) => b.points - a.points).slice(0, 10);
    return topTenUsers;
  },
});
