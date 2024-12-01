<script>
  import HowToPlay from "./HowToPlay.svelte";
  import Leaderboard from "./Leaderboard.svelte";
  import Profile from "./Profile.svelte";
</script>

<header class="py-3">
  <div class="container mx-auto max-w-xl border-b-2 border-zinc-600">
    <div class="flex justify-between p-2">
      <div class="flex gap-3">
        <!-- How to play -->
        <HowToPlay />
        <!-- Placeholder -->
        <div class="opacity-0 cursor-default">
          <i class="ri-question-line text-2xl sm:text-3xl text-black/75"></i>
        </div>
      </div>
      <!-- WORDLE -->
      <a href="/" class="flex items-center gap-1">
        <h1 class="text-xl min-[425px]:text-2xl font-bold text-zinc-300">
          WORDLE
        </h1>
        <i
          class="ri-infinity-line text-xl min-[425px]:text-2xl font-bold text-zinc-300"
        ></i>
      </a>
      <div class="flex gap-3">
        <!-- Leaderboard -->
        <Leaderboard />
        <!-- Profile -->
        <Profile />
      </div>
    </div>
  </div>
</header>
