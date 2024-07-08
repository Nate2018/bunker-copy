<script lang="ts">
    import { onMount } from 'svelte';
    import RouteButton from "$lib/components/routeButtons/RouteButton.svelte";
    import { plugins, externalPlugins, loadStore, externalPluginLocations, internalPlugins } from "../lib/store";
    import { loadScript } from './document.js';
    import Button from "$lib/components/ui/button/button.svelte";
    import { fetchExternalPlugin } from '$lib/fetchplugin'; 
    import type { Plugin } from '$lib/plugin';
    import PluginLoader from "$lib/components/PluginLoader.svelte";
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import Status from '$lib/internal/Plugins/Status/Plugin.svelte';
    import Viewer from '$lib/internal/Plugins/Viewer/Plugin.svelte';

    let path = '';
    onMount(async () => {
        await loadScript('https://cdn.tailwindcss.com/');
        console.log('script loaded successfully!');
    });
    onMount(async () => {
        loadStore();
        $externalPlugins = [];
        $internalPlugins = [];
        loadExternalPlugins();
        loadInternalPlugins();
    });
    
    async function loadInternalPlugins() {
        let internalPlugins1 = [
            {
                name: 'Status',
                id: 'bunker.status',
                version: '1.0.0',
                author: 'cattn',
                description: 'Status of Bunker',
                content: Status,
                type: 'tile'
            },
            {
                name: 'Viewer',
                id: 'bunker.viewer',
                version: '1.0.0',
                author: 'cattn',
                description: 'A widget for viewing websites within Bunker.',
                content: Viewer,
                type: 'tile'
            }
        ];
        internalPlugins.set(internalPlugins1);
        console.log($internalPlugins);
    }
    
    function clearPlugins() {
        plugins.set([]);
        externalPlugins.set([]);
        externalPluginLocations.set([]);
        internalPlugins.set([]);
    }

    let pluginUrl: string = '';

    async function fetchAndAddPlugin(url: string) {
        externalPluginLocations.update((currentPluginLocations: string[]) => [...currentPluginLocations, url]);
        const plugin = await fetchExternalPlugin(url);
        console.log(plugin);
        if (plugin) {
            externalPlugins.update((currentPlugins: Plugin[]) => [...currentPlugins, plugin]);
        }
        console.log($externalPlugins);
        pluginUrl = '';
    }

    async function loadExternalPlugins() {
        for (const url of $externalPluginLocations) {
            const plugin = await fetchExternalPlugin(url);
            if (plugin) {
                externalPlugins.update((currentPlugins: Plugin[]) => [...currentPlugins, plugin]);
            }
        }
    }
    
</script>

<h1 class="font-bold text-5xl text-center mt-20"> Bunker </h1>
<div class="flex justify-center">
    {#each $externalPlugins as plugin}
        <div class="bg-gray-900 rounded-lg p-4 mt-2 ml-4">
            <h1 class="font-bold text-3xl text-left"> {plugin.name} </h1>
            <PluginLoader this={plugin.content} />
        </div>
    {/each}

    {#if $internalPlugins}
        {#each $internalPlugins as plugin}
            <div class="bg-gray-900 rounded-lg p-4 mt-2 ml-4">
                <h1 class="font-bold text-3xl text-left"> {plugin.name} </h1>
                <svelte:component this={plugin.content}></svelte:component>
            </div>
        {/each}
    {/if}

</div>
<div class="mt-2 flex justify-center">
<RouteButton class="m-1" variant="secondary" href="/viewer">Go to Viewer</RouteButton>

<Button class="m-1" variant="destructive" on:click={clearPlugins}>Clear plugins</Button>
<Button class="m-1" variant="outline" on:click={() => fetchAndAddPlugin('https://raw.githubusercontent.com/Cattn/sample-bunker-plugin/c0a4bff6f9c66e6876242e8a0d39e9b8022f2bf0/dist/')}>Fetch and Add Plugin</Button>
<AlertDialog.Root>
    <AlertDialog.Trigger asChild let:builder>
      <Button class="m-1" builders={[builder]} variant="outline">Show Dialog</Button>
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title class="px-4 pt-4">Add Plugin</AlertDialog.Title>
        <AlertDialog.Description class="px-4">
          Input the link to the directory of the plugin. Make sure you trust the plugin's source, as they could be malicious.

          <Input bind:value={pluginUrl} type="text" placeholder="Plugin URL" class="w-full mt-1" />
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action on:click={() => fetchAndAddPlugin(pluginUrl)}>Submit</AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>

</div>