<script lang="ts">
    import RouteButton from "$lib/components/routeButtons/RouteButton.svelte";
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
</script>

<Tooltip.Root>
    <div class="w-16 h-screen bg-zinc-800 flex flex-col justify-between fixed left-0 top-0 z-40">
      <div>
        <div class="font-extrabold text-3xl bg-zinc-700 aspect-square m-3 rounded-lg flex items-center justify-center cursor-pointer">B</div>
        <div class="flex flex-col">
          <RouteButton variant="secondary" href="/home">Home</RouteButton>
          <RouteButton variant="secondary" href="/viewer">Viewer</RouteButton>
        </div>
      </div>
      <div>
        <div class="font-extrabold text-3xl bg-zinc-700 aspect-square m-3 rounded-lg flex items-center justify-center cursor-pointer">B</div>
      </div>
    </div>
</Tooltip.Root>