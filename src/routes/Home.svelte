<script lang="ts">
    import { onMount } from 'svelte';
    import { externalPlugins, loadStore, externalPluginLocations, internalPlugins } from "../lib/store";
    import { fetchExternalPlugin } from '$lib/fetchplugin'; 
    import type { Plugin } from '$lib/plugin';
    import PluginLoader from "$lib/components/PluginLoader.svelte";
    import Status from '$lib/internal/Plugins/Status/Plugin.svelte';
    import Viewer from '$lib/internal/Plugins/Viewer/Plugin.svelte';

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