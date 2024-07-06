<script lang="ts">
    import PluginLoader from "$lib/components/PluginLoader.svelte";
    import { onMount } from 'svelte';
    import { currentApp, loadStore } from "../lib/store";

    onMount(async () => {
        loadStore();
        console.log($currentApp);
    });

</script>   

    {#if $currentApp}
    <div class=" ml-24 mt-4 mr-10 pb-10 h-full overscroll-none">
        <PluginLoader this={$currentApp.content} />
    </div>
    {/if}