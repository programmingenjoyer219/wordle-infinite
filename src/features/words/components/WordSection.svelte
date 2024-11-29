<script lang="ts">
  import { attemptNumber } from "$features/game/stores/attemptNumber.svelte";
  import { playerAttempts } from "$features/game/stores/game.svelte";
  import { playerInput } from "$features/game/stores/playerInput.svelte";
  import { getCharStatus } from "$features/game/utils";
  import Letter from "./Letter.svelte";
</script>

{#snippet letter(attempt_number: number, letter_number: number)}
  {#if attemptNumber.value === attempt_number}
    <Letter status="typing">
      {playerInput.value[letter_number]}
    </Letter>
  {:else if attemptNumber.value <= attempt_number}
    <Letter status="typing">
      {""}
    </Letter>
  {:else}
    <Letter status={getCharStatus(attempt_number, letter_number)}>
      {playerAttempts.value[attempt_number][letter_number]}
    </Letter>
  {/if}
{/snippet}

<section class="py-4">
  <div class="container mx-auto max-w-xl px-2">
    <div class="flex flex-col gap-1">
      {#each [0, 1, 2, 3, 4, 5] as attempt_number}
        <div class="flex justify-center gap-1">
          {#each [0, 1, 2, 3, 4] as letter_number}
            {@render letter(attempt_number, letter_number)}
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>
