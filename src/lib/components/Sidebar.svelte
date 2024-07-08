<script lang="ts">
    import RouteButton from "$lib/components/routeButtons/RouteButton.svelte";
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    import Button from "./ui/button/button.svelte";
    import { House, LibraryBig, SquarePlus, Gamepad2, Globe } from "lucide-svelte";
    import { externalPlugins, loadStore, externalAppLocations, externalApps, currentApp, internalApps, currentAppType } from "../store";
    import { onMount } from 'svelte';
    import { fetchExternalPlugin } from "$lib/fetchplugin";
    import type { Plugin } from "$lib/plugin";
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
    import Input from "./ui/input/input.svelte";
    import { goto } from 'svelte-pathfinder'
    import GBA from "$lib/internal/Apps/GBA/App.svelte";
    import Viewer from "$lib/internal/Apps/Viewer/App.svelte";

    let appURL: string = '';

    onMount(async () => {
        loadStore();
        await loadApps();
        await loadInternalApps();
    });

    async function loadInternalApps() {
        let internalApps1 = [
            {
                name: 'GBA',
                id: 'bunker.gba',
                version: '1.0.0',
                author: 'cattn',
                description: 'GBA',
                content: GBA,
                type: 'app',
                icon: Gamepad2
            },
            {
                name: 'Viewer',
                id: 'bunker.viewer',
                version: '1.0.0',
                author: 'cattn',
                description: 'A widget for viewing websites within Bunker.',
                content: Viewer,
                type: 'app',
                icon: Globe
            }
        ];
        internalApps.set(internalApps1);
    }

    async function loadApps() {
        for (const app of $externalAppLocations) {
            const plugin = await fetchExternalPlugin(app);
            if (plugin) {
                externalApps.update((currentApps: Plugin[]) => [...currentApps, plugin]);
            }
        }
    }

    async function fetchAndAddApp(url: string) {
        externalAppLocations.update((currentAppLocations: string[]) => [...currentAppLocations, url]);
        const plugin = await fetchExternalPlugin(url);
        if (plugin) {
            externalApps.update((currentApps: Plugin[]) => [...currentApps, plugin]);
        }
        appURL = '';
    }

    function clearApps() {
        externalApps.set([]);
        externalAppLocations.set([]);
    }

    function setActiveApp(plugin: Plugin, type: string) {
        if(type == "internal") {
            currentAppType.set("internal");
        } else {
            currentAppType.set("external");
        }
        currentApp.set(plugin);
        console.log("erm")
        goto("/app");
    }
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

          {#each $externalApps as plugin}
            <Tooltip.Root openDelay={50}>
              <Tooltip.Trigger asChild let:builder>
                <!-- svelte-ignore a11y-missing-attribute -->
                <Button builders={[builder]} on:click={() => setActiveApp(plugin, "external")} class="py-7 bg-transparent hover:bg-zinc-700" variant="outline"><LibraryBig /><!-- <img src={plugin.icon} /> --></Button>
              </Tooltip.Trigger>
              <Tooltip.Content class="border border-zinc-700" side="right">
                <p>{plugin.name}</p>
              </Tooltip.Content>
            </Tooltip.Root>
          {/each}

          {#if $internalApps}
            {#each $internalApps as plugin}
            <Tooltip.Root openDelay={50}>
              <Tooltip.Trigger asChild let:builder>
                <!-- svelte-ignore a11y-missing-attribute -->
                <Button builders={[builder]} on:click={() => setActiveApp(plugin, "internal")} class="py-7 bg-transparent hover:bg-zinc-700" variant="outline"><svelte:component this={plugin.icon}></svelte:component><!-- <img src={plugin.icon} /> --></Button>
              </Tooltip.Trigger>
              <Tooltip.Content class="border border-zinc-700" side="right">
                <p>{plugin.name}</p>
              </Tooltip.Content>
            </Tooltip.Root>
            {/each}
          {/if}
          
        </div>
      </div>
      <div>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Tooltip.Root openDelay={50}>
              <Tooltip.Trigger asChild let:builder>
                <Button builders={[builder]} class="font-extrabold text-3xl bg-zinc-700 aspect-square m-3 p-0 rounded-lg flex items-center justify-center cursor-pointer"><SquarePlus color="black" /></Button>
              </Tooltip.Trigger>
              <Tooltip.Content class="border border-zinc-700" side="right">
                <p>Add App</p>
              </Tooltip.Content>
            </Tooltip.Root>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Header>
              <AlertDialog.Title class="px-4 pt-4">Add App</AlertDialog.Title>
              <AlertDialog.Description class="px-4">
                Input the link to the directory of the plugin. Make sure you trust the plugin's source, as they could be malicious.
      
                <Input bind:value={appURL} type="text" placeholder="App URL" class="w-full mt-1" />
              </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
              <AlertDialog.Cancel on:click={() => clearApps()}>Clear Apps</AlertDialog.Cancel>
              <AlertDialog.Action on:click={() => fetchAndAddApp(appURL)}>Submit</AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    </div>