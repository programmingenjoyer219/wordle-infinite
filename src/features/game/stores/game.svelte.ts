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
  const tracked = ["", "", "", "", ""];

  for (let i = 0; i < 5; i += 1) {
    if (playerInput[i] === answer[i]) {
      result[i] = "x";
      tracked[i] = answer[i];
    } else {
      result[i] = "_";
    }
  }

  for (let i = 0; i < 5; i += 1) {
    const char = playerInput[i];
    const index = answer.indexOf(char);
    // number of times 'char' appears in 'tracked'
    const trackedCount = tracked.filter((t) => t === char).length;
    // number of times 'char' appears in 'answer'
    const answerCount = answer.split("").filter((a) => a === char).length;

    if (index !== -1 && result[i] !== "x") {
      if (trackedCount < answerCount) {
        result[i] = "c";
        tracked[i] = char;
      }
    }
  }

  answerTracker.value[attemptNumber.value] = result.join("");
}
