import type { User } from "@auth/sveltekit";

export let userSessionStore = $state<{ value: User | null }>({
  value: null,
});
