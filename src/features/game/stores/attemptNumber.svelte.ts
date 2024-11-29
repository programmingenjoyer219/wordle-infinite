export let attemptNumber = $state<{ value: number }>({
  value: Number(localStorage.getItem("attemptNumber")),
});
