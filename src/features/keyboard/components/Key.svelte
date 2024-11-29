<script lang="ts">
  import type { CharStatus } from "$lib/types";
  import { playerInput } from "$features/game/stores/playerInput.svelte";

  interface Props {
    status: CharStatus | null;
    keyName: string;
  }

  let { status, keyName }: Props = $props();

  function handleClick(keyName: string) {
    if (playerInput.value.length >= 0 && playerInput.value.length < 5) {
      playerInput.value += keyName;
    }
  }
</script>

<button
  onclick={() => handleClick(keyName)}
  class="key {status && `key-${status}`}"
>
  {keyName}
</button>
