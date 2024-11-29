import {
  answerTracker,
  playerAttempts,
} from "$features/game/stores/game.svelte";
import type { CharStatus } from "$lib/types";

interface KeyboardStatus {
  [key: string]: CharStatus | null;
}

let keyboardStatus = $derived.by(() => {
  const status: KeyboardStatus = {
    // row 1
    q: null,
    w: null,
    e: null,
    r: null,
    t: null,
    y: null,
    u: null,
    i: null,
    o: null,
    p: null,
    // row 2
    a: null,
    s: null,
    d: null,
    f: null,
    g: null,
    h: null,
    j: null,
    k: null,
    l: null,
    // row 3
    z: null,
    x: null,
    c: null,
    v: null,
    b: null,
    n: null,
    m: null,
  };

  for (let i = 0; i < 6; i += 1) {
    const word = playerAttempts.value[i];
    const answer = answerTracker.value[i];

    for (let i = 0; i < 5; i += 1) {
      if (answer[i] === "x") {
        status[word[i]] = "correct";
      } else if (answer[i] === "c") {
        if (status[word[i]] !== "correct") status[word[i]] = "included";
      } else if (answer[i] === "_") {
        if (status[word[i]] !== "correct" && status[word[i]] !== "included")
          status[word[i]] = "not-included";
      }
    }
  }

  return status;
});

export function getKeyboardStatus() {
  return keyboardStatus;
}
