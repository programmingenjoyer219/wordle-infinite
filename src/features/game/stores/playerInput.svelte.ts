export let playerInput = $state<{ value: string }>({
  value: localStorage.getItem("playerInput") ?? "",
});
