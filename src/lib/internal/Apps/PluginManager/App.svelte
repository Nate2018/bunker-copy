<script type="ts">
    import { plugins, externalPlugins, loadStore, externalPluginLocations, internalPlugins, externalAppLocations, externalApps } from '$lib/store';
    import { onMount } from 'svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    // @ts-ignore
    import { Badge } from "$lib/components/ui/badge/index.ts";



    onMount(async () => {
        loadStore();
    });

    // @ts-ignore
    function removePlugin(event, plugin) {
            if (event === 'external') {
                externalPlugins.update(plugins => plugins.filter(p => p !== plugin));
                externalPluginLocations.update(plugins => plugins.filter(p => p !== plugin.url));
            } else {
                internalPlugins.update(plugins => plugins.filter(p => p !== plugin));
            }
    }
    // @ts-ignore
    function removeApp(app) {
            externalApps.update(plugins => plugins.filter(p => p !== app));
            externalAppLocations.update(plugins => plugins.filter(p => p !== app.url));
    }
</script>
<h1 class="text-3xl font-bold text-center mb-4">Plugin Manager</h1>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each $externalPlugins as plugin}
        <div class="bg-gray-900 rounded-lg p-4">
            <h1 class="text-2xl font-bold text-left"> {plugin.name} </h1>
            <Badge variant="destructive">External</Badge>
            <p class="text-lg text-left"> {plugin.description} </p>
            <div class="flex items-center justify-between">
                <p class="text-lg text-left"> {plugin.author} </p>
                <p class="text-lg text-left"> {plugin.version} </p>
            </div>
            <Button variant="destructive" class="mt-2" on:click={() => removePlugin('external', plugin)}>Remove</Button>
        </div>
    {/each}

    {#each $internalPlugins as plugin}
        <div class="bg-gray-900 rounded-lg p-4">
            <h1 class="text-2xl font-bold text-left"> {plugin.name} </h1>
            <Badge variant="secondary">Internal</Badge>
            <p class="text-lg text-left"> {plugin.description} </p>
            <div class="flex items-center justify-between">
                <p class="text-lg text-left"> {plugin.author} </p>
                <p class="text-lg text-left"> {plugin.version} </p>
            </div>
            <Button variant="destructive" class="mt-2" on:click={() => removePlugin('internal', plugin)}>Remove</Button>
        </div>
    {/each}
</div>

<h1 class="text-3xl font-bold text-center mt-4">App Manager</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each $externalApps as plugin}
        <div class="bg-gray-900 rounded-lg p-4">
            <h1 class="text-2xl font-bold text-left"> {plugin.name} </h1>
            <Badge variant="destructive">External</Badge>
            <p class="text-lg text-left"> {plugin.description} </p>
            <div class="flex items-center justify-between">
                <p class="text-lg text-left"> {plugin.author} </p>
                <p class="text-lg text-left"> {plugin.version} </p>
            </div>
            <Button variant="destructive" class="mt-2" on:click={() => removeApp(plugin)}>Remove</Button>
        </div>
    {/each}
</div>
