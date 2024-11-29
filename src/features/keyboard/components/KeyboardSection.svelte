<script lang="ts">
  import { KEYBOARD_LAYOUT } from "../utils";
  import Key from "./Key.svelte";
  import EnterKey from "./EnterKey.svelte";
  import BackspaceKey from "./BackspaceKey.svelte";
  import { getKeyboardStatus } from "../stores/keyboardStatus.svelte";

  let keyboardStatus = $derived.by(getKeyboardStatus);
</script>

<section class="py-3">
  <div class="container mx-auto max-w-xl px-2">
    <div class="flex flex-col gap-2">
      <!-- rows 1 to 3 -->
      {#each KEYBOARD_LAYOUT as row, rowIndex (rowIndex)}
        <div class="flex justify-center gap-1">
          {#each row as keyName}
            {@const status = keyboardStatus[keyName]}
            <Key {keyName} {status} />
          {/each}
        </div>
      {/each}
      <!-- row 4 -->
      <div class="flex justify-center gap-1">
        <EnterKey />
        <BackspaceKey />
      </div>
    </div>
  </div>
</section>
