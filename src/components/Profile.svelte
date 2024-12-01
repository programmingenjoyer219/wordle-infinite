<script lang="ts">
  import { getContext } from "svelte";
  import Menu from "./Menu.svelte";
  import { SignOut } from "@auth/sveltekit/components";
  import type { GetUser } from "$lib/types";
  import { playerRank } from "$features/game/stores/playerRank.svelte";

  let openMenu = $state(false);

  const getUser = getContext("get_user") as GetUser;
  let user = $derived.by(getUser);
</script>

<button id="user-btn" onclick={() => (openMenu = true)}>
  <img
    src={user?.image}
    alt="{user?.name}'s profile image"
    class="size-8 rounded-full border-2 border-zinc-300"
  />
  <span class="sr-only">Profile</span>
</button>

<Menu bind:visibile={openMenu}>
  <div
    class="container max-w-[280px] bg-zinc-800 p-6 shadow-lg rounded-sm space-y-3 text-zinc-300"
  >
    <div class="flex flex-col gap-1">
      <img
        src={user?.image}
        alt="{user?.name}'s profile image"
        class="size-10 rounded-full border-2 border-black/50"
      />
      <!-- username -->
      <p class="text-lg font-bold">{user?.name}</p>
    </div>
    <div>
      <!-- leaderboard rank -->
      <p>
        <i class="ri-bar-chart-fill text-green-600 text-lg mr-2"></i>Rank: {playerRank.value}
      </p>
      <!-- points -->
      <p>
        <i class="ri-focus-2-line text-red-600 text-lg mr-2"></i>Points: {user?.points}
      </p>
    </div>
    <!-- Logout button -->
    <SignOut>
      <div
        slot="submitButton"
        class="w-[232px] rounded-sm bg-zinc-900 text-zinc-100 font-bold p-2"
      >
        Log Out
        <i class="ri-logout-box-r-line"></i>
      </div>
    </SignOut>
  </div>
</Menu>
