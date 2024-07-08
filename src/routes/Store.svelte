<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import { loadStore, externalStores, internalStores, externalPluginLocations, externalPlugins, externalAppLocations, externalApps } from "$lib/store";
    import type { Plugin } from "$lib/plugin";
    import { fetchExternalPlugin } from "$lib/fetchplugin";
    import { openStore } from "$lib/openstore";
    import { onMount } from "svelte";
    // @ts-ignore
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.ts";
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { toast } from '@zerodevx/svelte-toast'

    let position = "https://raw.githubusercontent.com/Cattn/bunker-store/main/store.json";
    $: if (position) loadStorePage(position);
    let newStoreText = '';
    let currentStore: any;
    

    onMount(async () => {
        loadStore();
        setInternalStores();
        loadStorePage(position);
    });

    async function fetchAndAddPlugin(url: string) {
        const plugin = await fetchExternalPlugin(url);
        if (plugin) {
            if ($externalPlugins.some(p => p.id === plugin.id)) {
                console.log("nuh uh");
                toast.push(`Plugin Already Exists!`, { theme: { '--toastBackground': 'red' } })
            } else {
                externalPlugins.update((currentPlugins: Plugin[]) => [...currentPlugins, plugin]);
                externalPluginLocations.update((currentPluginLocations: string[]) => [...currentPluginLocations, url]);
                toast.push('Plugin added!');
            }
        }
    }

    async function fetchAndAddApp(url: string) {
        const plugin = await fetchExternalPlugin(url);
        if (plugin) {
            if ($externalApps.some(p => p.id === plugin.id)) {
                console.log("nuh uh");
                toast.push(`App Already Exists!`, { theme: { '--toastBackground': 'red' } })
            } else {
                externalApps.update((currentApps: Plugin[]) => [...currentApps, plugin]);
                externalAppLocations.update((currentAppLocations: string[]) => [...currentAppLocations, url]);
                toast.push('App added!');
            }
        }
    }



    async function addStore(store: string) {
        let storeInfo = await openStore(store);
        let newStore = {
            // @ts-ignore
            name: storeInfo.name,
            url: store
        }
        externalStores.update((externalStores) => [...externalStores, newStore]);
        toast.push('Store added!'); 
    }

    async function loadStorePage(store: string) {
        let storeInfo = await openStore(store);
        currentStore = storeInfo;
    }

    function setInternalStores() {
        let internalStores1 = [
            {
                name: 'Bunker Store',
                url:"https://raw.githubusercontent.com/Cattn/bunker-store/main/store.json"
            }
        ];
        internalStores.set(internalStores1);
    }
    
    function clearExternalStores() {
        externalStores.set([]);
    }
</script>
<div class="flex justify-center mt-2">
    <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
          <Button variant="outline" builders={[builder]}>Select Store</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-56">
          <DropdownMenu.RadioGroup bind:value={position}>
            {#each $externalStores as store}
              <DropdownMenu.RadioItem on:click={() => loadStorePage(position)} value={store.url}>{store.name}</DropdownMenu.RadioItem>
            {/each}
            {#each $internalStores as store}
              <DropdownMenu.RadioItem on:click={() => loadStorePage(position)} value={store.url}>{store.name}</DropdownMenu.RadioItem>
            {/each}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild let:builder>
            <Button builders={[builder]} variant="outline" class="ml-2">Add Store</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title class="px-4 pt-4">Add Store</AlertDialog.Title>
            <AlertDialog.Description class="px-4">
              Input the link to a store, be sure to trust the source, as they could be malicious.
    
              <Input bind:value={newStoreText} type="text" placeholder="Store URL" class="w-full mt-1" />
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action on:click={clearExternalStores}>Clear Stores</AlertDialog.Action>
            <AlertDialog.Action on:click={() => addStore(newStoreText)}>Submit</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
</div>

<div class="flex flex-col items-center mt-2">
    <div class="w-full max-w-2xl">
        {#if currentStore}
            <h1 class="text-3xl font-bold text-center mb-4">{currentStore.name}</h1>
            <p class="text-xl text-center mb-8">{currentStore.description}</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {#each currentStore.plugins as plugin}
                    <div class="bg-gray-900 rounded-lg p-4 shadow-md">
                        <h1 class="text-xl font-semibold mb-2">{plugin.name}</h1>
                        <p class="text-sm mb-2">{plugin.description}</p>
                        <div class="flex items-center justify-between">
                            <p class="text-sm">{plugin.author}</p>
                            <p class="text-sm">{plugin.version}</p>
                        </div>
                        <Button on:click={() => fetchAndAddPlugin(plugin.url)} class="mt-2" variant="outline">Add</Button>
                    </div>
                {/each}
                {#each currentStore.apps as app}
                    <div class="bg-gray-900 rounded-lg p-4 shadow-md">
                        <h1 class="text-xl font-semibold mb-2">{app.name}</h1>
                        <p class="text-sm mb-2">{app.description}</p>
                        <div class="flex items-center justify-between">
                            <p class="text-sm">{app.author}</p>
                            <p class="text-sm">{app.version}</p>
                        </div>
                        <Button on:click={() => fetchAndAddApp(app.url)} class="mt-2" variant="outline">Add</Button>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

