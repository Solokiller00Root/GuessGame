import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    image: v.string(),
    points: v.number(),
  }),
  games: defineTable({
    name: v.string(),
    owner: v.id("users"),
    privacy: v.string(),
    logs: v.array(v.string()),
    rounds: v.array(
      v.object({
        word: v.string(),
        status: v.union(v.literal("ongoing"), v.literal("guessed")),
      })
    ),
    status: v.union(
      v.literal("waiting"),
      v.literal("ongoing"),
      v.literal("finished")
    ),
    players: v.array(v.id("users")),
    password: v.union(v.string(), v.null()),
  }),
});