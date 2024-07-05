<script lang="ts">
    import { onMount } from 'svelte';
    import RouteButton from "$lib/components/routeButtons/RouteButton.svelte";
    import { plugins, externalPlugins } from "./store";
    import { loadScript } from './document.js';
    import Button from "$lib/components/ui/button/button.svelte";
    import { fetchExternalPlugin } from '$lib/fetchplugin'; // Adjust the path as needed
    import type { Plugin } from '$lib/plugin'; // Adjust the path as needed
    import PluginLoader from "$lib/components/PluginLoader.svelte";

    onMount(async () => {
        await loadScript('https://cdn.tailwindcss.com/');
        console.log('script loaded successfully!');
    });
    async function loadComponent(name: string) {
        const module = await import(`$lib/components/${name}.svelte`);
        return module.default;
    }

    let testPlugin = {
        name: 'Viewer',
        version: '1.0.0',
        content: {
            name: 'Viewer',
            version: '1.0.0',
            svelte: "Viewer",
        }
    };

    // Clear plugins
    function clearPlugins() {
        plugins.set([]);
    }

    function addPlugin() {
        plugins.update((currentPlugins: any) => [...currentPlugins, testPlugin]);
    }


    async function fetchAndAddPlugin(url: string) {
        const plugin = await fetchExternalPlugin(url);
        console.log(plugin);
        if (plugin) {
            externalPlugins.update((currentPlugins: Plugin[]) => [...currentPlugins, plugin]);
        }
    }



    
</script>

<h1 class="font-bold text-5xl text-center"> Bunker </h1>
<div class="flex">
    {#each $plugins as plugin}
        <div class="bg-gray-900 rounded-lg p-4 mt-2">
            <h1 class="font-bold text-3xl"> {plugin.name} </h1>
            <p>{plugin.version}</p>
            {#await loadComponent(plugin.content.svelte) then myComponent}
                {#if myComponent instanceof HTMLElement}
                    <div>{myComponent.outerHTML}</div>
                {:else}
                    <svelte:component this={myComponent} />
                {/if}
            {/await}
        </div>
    {/each}

    {#each $externalPlugins as plugin}
        <div class="bg-gray-900 rounded-lg p-4 mt-2 ml-4">
            <h1 class="font-bold text-3xl text-left"> {plugin.name} </h1>
            <!--<p>{plugin.author}</p>
            <p>{plugin.description}</p>
            <p>{plugin.version}</p>
            <p>{plugin.id}</p>-->
            <PluginLoader this={plugin.content} prop="Foo" otherProp="Bar" />
        </div>
    {/each}
</div>
<div class="mt-2">
<RouteButton variant="secondary" href="/viewer">Go to Viewer</RouteButton>

<Button variant="destructive" on:click={clearPlugins}>Clear plugins</Button>
<Button variant="outline" on:click={addPlugin}>Add plugin</Button>
<Button variant="outline" on:click={() => fetchAndAddPlugin('https://raw.githubusercontent.com/Cattn/sample-bunker-plugin/main/dist/')}>Fetch and Add Plugin</Button>
</div>