<script>
    let real = "real";
    import { Skull } from 'lucide-svelte';
    let text = "";
    let iframeVisible = "";
    
    function launchViewer(url) {
        try {
              new URL(url)
              document.getElementById('iframe').src = url
              iframeVisible = "border-8 border-secondary w-full h-full";
            } catch (e) {
              console.log(e);
            }
        }
</script>

{#if !iframeVisible}
<div class="flex flex-col items-center justify-center rounded-lg px-6 mt-20 mb-4">
<div class="flex flex-col w-1/2">
    <h1 class="font-bold text-5xl text-center mb-2">Bunker Viewer</h1>
    <input class="bg-primary outline-1 outline-secondary text-black font-bold py-2 px-4 rounded mb-2" placeholder="URL (not proxied)" bind:value={text} type="text" />
    <button class="bg-primary outline-1 outline-secondary text-black font-bold py-2 px-4 rounded mb-2" on:click={() => launchViewer(text)}>Go!</button>
</div>
</div>
{/if}

<!-- svelte-ignore a11y-missing-attribute -->
<iframe id="iframe" class="{iframeVisible}" />

