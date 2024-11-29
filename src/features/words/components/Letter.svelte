<script lang="ts">
  import type { CharStatus } from "$lib/types";
  import type { Snippet } from "svelte";

  interface Props {
    status: CharStatus | "typing";
    children: Snippet;
  }

  let { status, children }: Props = $props();
</script>

<div class={status}>
  {@render children()}
</div>
