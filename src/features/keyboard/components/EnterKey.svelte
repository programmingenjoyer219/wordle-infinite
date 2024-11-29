<script>
  import { allowed } from "$features/game/db/words";
  import { attemptNumber } from "$features/game/stores/attemptNumber.svelte";
  import {
    playerAttempts,
    trackAnswer,
  } from "$features/game/stores/game.svelte";
  import { playerInput } from "$features/game/stores/playerInput.svelte";
  import toast from "svelte-french-toast";

  function handleClick() {
    if (playerInput.value.length < 5) return;

    if (allowed.has(playerInput.value)) {
      playerAttempts.value[attemptNumber.value] = playerInput.value;
      trackAnswer(playerInput.value);
    } else {
      toast.error("Invalid word");
      return;
    }

    playerInput.value = "";
    attemptNumber.value += 1;
  }
</script>

<button onclick={handleClick} class="action-key">Enter</button>
