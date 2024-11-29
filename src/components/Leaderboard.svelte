<script lang="ts">
  import { useQuery } from "convex-svelte";
  import Menu from "./Menu.svelte";
  import { api } from "$convex/_generated/api";
  import type { Id } from "$convex/_generated/dataModel";
  import { getContext } from "svelte";
  import { playerRank } from "$features/game/stores/playerRank.svelte";

  let openMenu = $state(false);
  const getLeaderboardQuery = useQuery(api.leaderboard.get, {});
  const getUserId: () => Id<"users"> = getContext("get_user_id");

  function updatePlayerRank(
    data: { id: Id<"users">; name: string; points: number }[]
  ) {
    const index = data.findIndex((p) => p.id === getUserId());
    playerRank.value = index + 1;
  }

  $effect(() => {
    if (getLeaderboardQuery.data) {
      updatePlayerRank(getLeaderboardQuery.data);
    }
  });
</script>

{#snippet table(data: { id: Id<"users">; name: string; points: number }[])}
  <div class="table">
    <div class="row">
      <div id="rank" class="column">
        <span class="">Rank</span>
      </div>
      <div id="name" class="column truncate">
        <span class="">Player</span>
      </div>
      <div id="points" class="column">
        <span class="">Points</span>
      </div>
    </div>
    {#each data as { id, name, points }, index (id)}
      <div class="row">
        <div id="rank" class="column">
          <span class="text-sm">{index + 1}.</span>
        </div>
        <div id="name" class="column truncate">
          <span class="text-sm">{name.split(" ")[0]}</span>
        </div>
        <div id="points" class="column">
          <span class="text-sm">{points}</span>
        </div>
      </div>
    {/each}
  </div>
{/snippet}

<button id="leaderboard-btn" onclick={() => (openMenu = true)}>
  <i class="ri-bar-chart-fill text-2xl sm:text-3xl text-black/75"></i>
  <span class="sr-only">Leaderboard</span>
</button>

<Menu bind:visibile={openMenu}>
  <div
    class="container overflow-y-scroll overscroll-contain max-w-xl max-h-[80vh] bg-gray-50 p-6 shadow-lg rounded-sm space-y-4"
  >
    <h1 class="text-xl sm:text-3xl text-gray-700 font-bold">Leaderboard</h1>
    {#if getLeaderboardQuery.isLoading}
      <p class="text-xl text-center animate-pulse">Loading...</p>
    {:else if getLeaderboardQuery.error}
      <p>Oops... something went wrong. Try refreshing.</p>
    {:else}
      {@render table(getLeaderboardQuery.data)}
    {/if}
  </div>
</Menu>

<style>
  .table {
    @apply flex flex-col gap-2;
  }
  .row {
    display: grid;
    grid-template-columns: 4rem auto 4rem;
    column-gap: 0.5rem;
  }
</style>
