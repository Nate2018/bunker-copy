
<script lang="ts">
    import Sidebar from "$lib/components/Sidebar.svelte";
    import { SvelteToast } from '@zerodevx/svelte-toast'
    import "./app.css";
    import { onMount } from "svelte";
    import { loadScript } from "./routes/document";
    onMount(async () => {
        await loadScript('https://cdn.tailwindcss.com/');
        console.log('script loaded successfully!');
    });

    // @ts-ignore
    import { path, prefs } from 'svelte-pathfinder';
    import routes from './routes'

    // Disable side effects to only keep history in browser memory.
    prefs.sideEffect = false

    // @ts-expect-error 2538
    $: page = routes[$path] || routes['/']

</script>
<Sidebar />
<SvelteToast />
<div class="flex justify-center overscroll-y-none">
    <div class="w-full h-lvh overscroll-y-none">
        <svelte:component this={page} />
    </div>
</div>