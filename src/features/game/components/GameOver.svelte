<script lang="ts">
  import Menu from "$components/Menu.svelte";
  import { getContext } from "svelte";
  import { dbUpdatePoints } from "../db/update";
  import { attemptNumber } from "../stores/attemptNumber.svelte";
  import { answerTracker, getAnswer } from "../stores/game.svelte";
  import { resetGame } from "../utils";
  import type { Id } from "$convex/_generated/dataModel";

  const POINT_MAP: { [key: number]: number } = {
    0: 25,
    1: 20,
    2: 15,
    3: 10,
    4: 5,
    5: 2,
  };

  const getUserId: () => Id<"users"> = getContext("get_user_id");

  let openMenu = $derived.by(() => {
    if (answerTracker.value.includes("xxxxx")) {
      return true;
    }

    if (attemptNumber.value > 5) {
      return true;
    }

    return false;
  });

  let passOrFail = $derived.by(() => {
    if (answerTracker.value.includes("xxxxx")) {
      return "pass";
    }

    return "fail";
  });

  let points = $derived.by(() => {
    const index = answerTracker.value.indexOf("xxxxx");
    if (index !== -1) return POINT_MAP[index];
    return 0;
  });

  function handleClick() {
    const userId = getUserId();
    dbUpdatePoints(userId, points);
    resetGame();
  }
</script>

<Menu visibile={openMenu} isClosable={false}>
  <div
    class="container w-[280px] bg-gray-50 p-6 shadow-lg rounded-sm space-y-4"
  >
    {#if passOrFail === "pass"}
      <h1 class="text-2xl font-medium text-black/75">Level cleared 🎉</h1>
    {:else}
      <h1 class="text-2xl font-medium text-black/75">Level failed 😿</h1>
    {/if}
    <p>
      <i class="ri-book-marked-line text-green-600 mr-1"></i>Answer: {getAnswer()}
    </p>
    <p>
      <i class="ri-focus-2-line text-red-500 mr-1"></i>Points: +{points}
    </p>
    <button
      onclick={handleClick}
      class="p-2 rounded-sm bg-black/75 text-gray-50 font-bold w-full"
    >
      Next level
      <i class="ri-arrow-right-line"></i>
    </button>
  </div>
</Menu>
