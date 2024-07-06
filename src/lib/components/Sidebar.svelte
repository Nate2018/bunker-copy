<script lang="ts">
    import RouteButton from "$lib/components/routeButtons/RouteButton.svelte";
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    import Button from "./ui/button/button.svelte";
    import { House, LibraryBig } from "lucide-svelte";
</script>
    <div class="w-16 h-screen bg-zinc-800 flex flex-col justify-between fixed left-0 top-0 z-40">
      <div>
        <div class="font-extrabold text-3xl bg-zinc-700 aspect-square m-3 rounded-lg flex items-center justify-center cursor-pointer">B</div>
        <div class="flex flex-col">
          <Tooltip.Root openDelay={50}>
            <Tooltip.Trigger asChild let:builder>
              <RouteButton builders={[builder]} class="py-7 bg-transparent hover:bg-zinc-700" variant="outline" href="/home"><House /></RouteButton>
            </Tooltip.Trigger>
            <Tooltip.Content class="border border-zinc-700" side="right">
              <p>Home</p>
            </Tooltip.Content>
          </Tooltip.Root>
          <Tooltip.Root openDelay={50}>
            <Tooltip.Trigger asChild let:builder>
              <RouteButton builders={[builder]} class="py-7 bg-transparent hover:bg-zinc-700" variant="outline" href="/viewer"><LibraryBig /></RouteButton>
            </Tooltip.Trigger>
            <Tooltip.Content class="border border-zinc-700" side="right">
              <p>Library</p>
            </Tooltip.Content>
          </Tooltip.Root>
        </div>
      </div>
      <div>
        <div class="font-extrabold text-3xl bg-zinc-700 aspect-square m-3 rounded-lg flex items-center justify-center cursor-pointer">B</div>
      </div>
    </div>