<script>
    import { onMount } from "svelte";
    let protectionStatus = "No (Unkown protocol)";
    let protectionColor = "text-red-400";

    function getProtectionStatus() {
        if (window.location.protocol === 'file:') {
            protectionStatus = "Yes";
            protectionColor = "text-green-400";
        } else {
            protectionStatus = "No (Unkown protocol)";
            protectionColor = "text-red-400";
        }
    }

    onMount(() => {
        getProtectionStatus();
    });

</script>

<div class="flex flex-col justify-cente rounded-lg mt-2">
    <div class="flex">
        <h3>Hidden from extensions: </h3> <h3 class="{protectionColor}">{protectionStatus}</h3>
    </div>
    <div class="flex">
        <h3>Connected to bunker servers: </h3> <h3 class="text-red-400">No</h3>
    </div>
</div>