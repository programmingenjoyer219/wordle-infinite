<script lang="ts">
  import Letter from "$features/words/components/Letter.svelte";
  import type { CharStatus } from "$lib/types";
  import Menu from "./Menu.svelte";

  interface LetterStatusMap {
    [key: string]: CharStatus | "typing";
  }

  let openMenu = $state(false);
</script>

<button id="how-to-play-btn" onclick={() => (openMenu = true)}>
  <i class="ri-question-line text-2xl sm:text-3xl text-zinc-300"></i>
  <span class="sr-only">How to play?</span>
</button>

{#snippet example(
  letterStatusMap: LetterStatusMap,
  char: string,
  sentence: string
)}
  <div>
    <div class="flex gap-1">
      {#each Object.keys(letterStatusMap) as key, index (index)}
        <Letter status={letterStatusMap[key]}>{key}</Letter>
      {/each}
    </div>
    <p class="text-sm sm:text-base text-zinc-300">
      <span class="font-bold">{char}</span>
      {sentence}
    </p>
  </div>
{/snippet}

<Menu bind:visibile={openMenu}>
  <div
    class="container overflow-y-auto max-w-xl max-h-[80vh] bg-zinc-800 p-6 shadow-lg rounded-sm space-y-4"
  >
    <div>
      <h1 class="text-xl sm:text-3xl text-zinc-300 font-bold">How To Play</h1>
      <h2 class="text-lg sm:text-xl text-zinc-300">
        Guess the Wordle in 6 tries
      </h2>
    </div>
    <ul class="list-disc pl-6 text-zinc-300 text-sm sm:text-base">
      <li>Each guess must be a valid 5-letter word.</li>
      <li>
        The color of the tiles will change to show how close your guess was to
        the word.
      </li>
    </ul>
    <div class="space-y-2">
      <h3 class="text-base sm:text-lg text-zinc-300 font-medium">Examples</h3>
      <!-- example-1: WORDY -->
      {@render example(
        {
          W: "correct",
          O: "typing",
          R: "typing",
          D: "typing",
          Y: "typing",
        },
        "W",
        "is in the word and in the correct spot."
      )}
      <!-- example-2: LIGHT -->
      {@render example(
        {
          L: "typing",
          I: "included",
          G: "typing",
          H: "typing",
          T: "typing",
        },
        "I",
        "is in the word but in the wrong spot."
      )}
      <!-- example-3: ROGUE -->
      {@render example(
        {
          R: "typing",
          O: "typing",
          G: "typing",
          U: "not-included",
          E: "typing",
        },
        "U",
        "is not in the word in any spot."
      )}
    </div>
  </div>
</Menu>
