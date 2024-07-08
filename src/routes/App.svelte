<script lang="ts">
    import PluginLoader from "$lib/components/PluginLoader.svelte";
    import GBA from "$lib/internal/Apps/GBA/App.svelte";
    import Viewer from "$lib/internal/Apps/Viewer/App.svelte";
    import { onMount } from 'svelte';
    import { currentApp, loadStore, currentAppType } from "../lib/store";

    onMount(async () => {
        loadStore();
        console.log($currentApp);
    });

</script>   

    {#if $currentApp}
    {#if $currentAppType === 'external'}
    <div class=" ml-24 mt-4 mr-10 pb-10 h-full overscroll-none">
        <PluginLoader this={$currentApp.content} />
    </div>
    {:else if $currentAppType === 'internal'}
    <div class=" ml-24 mt-4 mr-10 pb-10 h-full overscroll-none">
        <svelte:component this={$currentApp.content}></svelte:component>
    </div>
    {/if}
    {/if}