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
    rounds: v.array(v.object({ word: v.string(), status: v.string() })),
    status: v.string(),
    players: v.array(v.id("users")),
    password: v.optional(v.string()),
  }),
});
