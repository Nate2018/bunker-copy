
<script lang="ts">
import "./app.css";

import { path, prefs } from 'svelte-pathfinder'
    import routes from './routes'

    // Disable side effects to only keep history in browser memory.
    prefs.sideEffect = false

    $: page = routes[$path] || routes['/']

</script>