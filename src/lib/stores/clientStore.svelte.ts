import { ConvexClient } from "convex/browser";

interface ClientStore {
  value: ConvexClient | null;
}

export let clientStore = $state<ClientStore>({ value: null });
