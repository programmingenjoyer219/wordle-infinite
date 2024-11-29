import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    let players = await ctx.db.query("users").collect();

    let rankings = players.map((p) => ({
      id: p._id,
      name: p.name,
      points: p.points,
    }));

    return rankings.sort((a, b) => b.points - a.points);
  },
});
