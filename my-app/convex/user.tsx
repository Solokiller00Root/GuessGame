import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createTask = mutation({
    args: { username: v.string() },
    handler: async (ctx, args) => {
        const users = await ctx.db.query("users").collect()
        const userIn = users.some((user) => { return user.username === args.username })
        if (!userIn) {
            await ctx.db.insert("users", { username: args.username });
        }
    },
});