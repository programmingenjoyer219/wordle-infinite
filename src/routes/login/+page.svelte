<script lang="ts">
  import { SignIn } from "@auth/sveltekit/components";
</script>

<div
  class="container mx-auto min-h-dvh flex flex-col items-center justify-center"
>
  <div
    class="flex flex-col items-center gap-4 text-center p-4 w-[280px] rounded-sm shadow-md border-2 border-gray-300 bg-gray-50"
  >
    <h1 class="text-4xl sm:text-6xl font-bold text-black/75">Wordle</h1>
    <i class="ri-infinity-line text-black/75 text-7xl sm:text-9xl"></i>
    <SignIn>
      <div
        slot="submitButton"
        class="py-3 px-5 rounded-sm bg-black/75 text-gray-50 space-x-2"
      >
        <span class="text-lg font-medium">Login</span>
        <i class="ri-google-fill text-xl"></i>
      </div>
    </SignIn>
  </div>
</div>
