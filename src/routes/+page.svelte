<script lang="ts">
  import Header from "$components/Header.svelte";
  import GameOver from "$features/game/components/GameOver.svelte";
  import KeyboardSection from "$features/keyboard/components/KeyboardSection.svelte";
  import WordSection from "$features/words/components/WordSection.svelte";
  import { Toaster } from "svelte-french-toast";

  import { api } from "$convex/_generated/api";
  import { PUBLIC_CONVEX_URL } from "$env/static/public";
  import { clientStore } from "$lib/stores/clientStore.svelte";
  import { userSessionStore } from "$lib/stores/userSessionStore.svelte";
  import { setupConvex, useConvexClient, useQuery } from "convex-svelte";
  import { setContext } from "svelte";
  import {
    answerIndex,
    answerTracker,
    playerAttempts,
  } from "$features/game/stores/game.svelte";
  import { attemptNumber } from "$features/game/stores/attemptNumber.svelte";
  import { playerInput } from "$features/game/stores/playerInput.svelte";

  setupConvex(PUBLIC_CONVEX_URL!);
  clientStore.value = useConvexClient();

  const dbGetUserQuery = useQuery(api.users.getUser, {
    email: userSessionStore.value?.email ?? "",
  });

  let user = $derived(dbGetUserQuery?.data?.[0]);
  let userId = $derived(user?._id);

  setContext("get_user", () => user);
  setContext("get_user_id", () => userId);

  $effect(() => {
    playerInput;
    localStorage.setItem("playerInput", playerInput.value);
  });

  $effect(() => {
    attemptNumber;
    localStorage.setItem("attemptNumber", "" + attemptNumber.value);
  });

  $effect(() => {
    answerIndex;
    localStorage.setItem("answerIndex", "" + answerIndex.value);
  });

  $effect(() => {
    playerAttempts;
    localStorage.setItem(
      "playerAttempts",
      JSON.stringify(playerAttempts.value)
    );
  });

  $effect(() => {
    answerTracker;
    localStorage.setItem("answerTracker", JSON.stringify(answerTracker.value));
  });
</script>

<Header />
<WordSection />
<KeyboardSection />
<GameOver />
<Toaster />
