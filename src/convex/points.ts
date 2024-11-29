import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const updatePoints = mutation({
  args: { id: v.id("users"), points: v.number() },
  handler: async (ctx, { id, points }) => {
    const user = await ctx.db.get(id);
    await ctx.db.patch(id, { points: user?.points! + points });
  },
});
