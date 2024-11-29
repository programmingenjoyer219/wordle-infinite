import { words } from "../db/words";
import { attemptNumber } from "./attemptNumber.svelte";

export let answerIndex = $state<{ value: number }>({
  value: Number(localStorage.getItem("answerIndex")),
});

export let playerAttempts = $state<{ value: string[] }>({
  value: JSON.parse(
    localStorage.getItem("playerAttempts") ??
      JSON.stringify(["", "", "", "", "", ""])
  ),
});

export let answerTracker = $state<{ value: string[] }>({
  value: JSON.parse(
    localStorage.getItem("answerTracker") ??
      JSON.stringify(["", "", "", "", "", ""])
  ),
});

let answer = $derived(words[answerIndex.value]);

export function getAnswer() {
  return answer;
}

export function trackAnswer(playerInput: string) {
  const result = ["", "", "", "", ""];

  for (let i = 0; i < 5; i += 1) {
    if (playerInput[i] === answer[i]) {
      result[i] = "x";
    } else {
      result[i] = "_";
    }
  }

  for (let i = 0; i < 5; i += 1) {
    const index = answer.indexOf(playerInput[i]);
    if (index !== -1 && result[i] !== "x") {
      result[i] = "c";
    }
  }

  answerTracker.value[attemptNumber.value] = result.join("");
}
