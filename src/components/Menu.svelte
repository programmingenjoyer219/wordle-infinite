<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    visibile: boolean;
    children: Snippet;
    isClosable?: boolean;
  }

  let {
    visibile = $bindable(false),
    children,
    isClosable = true,
  }: Props = $props();

  function handleClick(e: Event) {
    if (!isClosable) return;
    if (e.target === e.currentTarget) {
      visibile = false;
    }
  }
</script>

{#if visibile}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <section
    id="how-to-play-menu"
    class="fixed top-0 left-0 right-0 bottom-0 bg-black/60 flex flex-col items-center justify-center p-4"
    onclick={handleClick}
  >
    {@render children()}
  </section>
{/if}
