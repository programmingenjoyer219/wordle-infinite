import type { CharStatus } from "$lib/types";
import { words } from "../db/words";
import { attemptNumber } from "../stores/attemptNumber.svelte";
import {
  answerIndex,
  answerTracker,
  playerAttempts,
} from "../stores/game.svelte";
import { playerInput } from "../stores/playerInput.svelte";

export function getCharStatus(
  attemptNumber: number,
  letterNumber: number
): CharStatus {
  if (answerTracker.value[attemptNumber][letterNumber] === "x")
    return "correct";
  if (answerTracker.value[attemptNumber][letterNumber] === "c")
    return "included";
  return "not-included";
}

export function resetGame() {
  answerIndex.value = Math.floor(Math.random() * words.length);
  playerAttempts.value = ["", "", "", "", "", ""];
  answerTracker.value = ["", "", "", "", "", ""];
  attemptNumber.value = 0;
  playerInput.value = "";
}
