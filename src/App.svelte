
<script lang="ts">
    import Sidebar from "$lib/components/Sidebar.svelte";
    import "./app.css";

    import { path, prefs } from 'svelte-pathfinder';
    import routes from './routes'

    // Disable side effects to only keep history in browser memory.
    prefs.sideEffect = false

    // @ts-expect-error 2538
    $: page = routes[$path] || routes['/']

</script>
<Sidebar />
<div class="flex justify-center mt-20">
    <div>
        <svelte:component this={page} />
    </div>
</div>