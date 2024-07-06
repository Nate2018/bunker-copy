<script lang="ts">
    import { onMount } from 'svelte';
    import RouteButton from "$lib/components/routeButtons/RouteButton.svelte";
    import { plugins, externalPlugins, loadStore, externalPluginLocations } from "./store";
    import { loadScript } from './document.js';
    import Button from "$lib/components/ui/button/button.svelte";
    import { fetchExternalPlugin } from '$lib/fetchplugin'; // Adjust the path as needed
    import type { Plugin } from '$lib/plugin'; // Adjust the path as needed
    import PluginLoader from "$lib/components/PluginLoader.svelte";
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    onMount(async () => {
        await loadScript('https://cdn.tailwindcss.com/');
        console.log('script loaded successfully!');
    });
    onMount(async () => {
        loadStore();
        $externalPlugins = [];
        loadExternalPlugins();
    });
    async function loadComponent(name: string) {
        const module = await import(/* @vite-ignore */ `$lib/components/${name}.svelte`);
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
        externalPlugins.set([]);
        externalPluginLocations.set([]);
    }

    function addPlugin() {
        plugins.update((currentPlugins: any) => [...currentPlugins, testPlugin]);
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
<Button variant="outline" on:click={() => fetchAndAddPlugin('https://raw.githubusercontent.com/Cattn/sample-bunker-plugin/c0a4bff6f9c66e6876242e8a0d39e9b8022f2bf0/dist/')}>Fetch and Add Plugin</Button>
<AlertDialog.Root>
    <AlertDialog.Trigger asChild let:builder>
      <Button builders={[builder]} variant="outline">Show Dialog</Button>
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