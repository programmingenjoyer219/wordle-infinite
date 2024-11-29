import { api } from "$convex/_generated/api";
import { clientStore } from "$lib/stores/clientStore.svelte";

export function dbAddUser(name: string, email: string, image: string) {
  clientStore.value
    ? clientStore.value.mutation(api.users.addUser, {
        name,
        email,
        image,
        points: 0,
      })
    : console.error("failed to add user: convexClient not initialised");
}
