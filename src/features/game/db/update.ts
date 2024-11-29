import { api } from "$convex/_generated/api.js";
import type { Id } from "$convex/_generated/dataModel";
import { clientStore } from "$lib/stores/clientStore.svelte";

export function dbUpdatePoints(id: Id<"users">, points: number) {
  clientStore.value?.mutation(api.points.updatePoints, { id, points });
}
