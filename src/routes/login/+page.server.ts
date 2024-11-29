import { ConvexHttpClient } from "convex/browser";
import type { PageServerLoad } from "./$types.js";
import { PUBLIC_CONVEX_URL } from "$env/static/public";
import { api } from "$convex/_generated/api.js";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (!session) return;
  const client = new ConvexHttpClient(PUBLIC_CONVEX_URL!);
  const users = await client.query(api.users.getUser, {
    email: session.user!.email!,
  });
  if (users.length === 0) {
    // add user to db
    const name = session.user!.name!;
    const email = session.user!.email!;
    const image = session.user!.image!;
    await client.mutation(api.users.addUser, { name, email, image, points: 0 });
  }
  redirect(307, "/");
};
