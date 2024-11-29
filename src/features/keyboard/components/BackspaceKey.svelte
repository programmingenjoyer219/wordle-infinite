<script>
  import { playerInput } from "$features/game/stores/playerInput.svelte";

  function handleClick() {
    if (playerInput.value.length === 0) return;
    playerInput.value = playerInput.value.slice(
      0,
      playerInput.value.length - 1
    );
  }
</script>

<button onclick={handleClick} class="action-key">Backspace</button>
