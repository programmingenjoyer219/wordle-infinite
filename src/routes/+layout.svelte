<script lang="ts">
  import "../app.css";
  import "remixicon/fonts/remixicon.css";
  import type { LayoutData } from "./$types";
  import { type Snippet } from "svelte";
  import { userSessionStore } from "$lib/stores/userSessionStore.svelte";

  interface Props {
    data: LayoutData;
    children: Snippet;
  }

  let { data, children }: Props = $props();
  userSessionStore.value = data.session?.user ?? null;
</script>

<svelte:head>
  <title>Wordle Infinite</title>
</svelte:head>

<main class="min-h-dvh font-mono">
  {@render children()}
</main>
