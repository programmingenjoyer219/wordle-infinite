import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUser = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const { email } = args;
    const requiredUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .collect();
    return requiredUser;
  },
});

export const addUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.string(),
    points: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", { ...args });
  },
});
