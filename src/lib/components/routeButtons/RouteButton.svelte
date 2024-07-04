<script lang="ts">
	import { Button as ButtonPrimitive } from "bits-ui";
	import { type Events, type Props, buttonVariants } from "./index.js";
	import { cn } from "$lib/utils.js";
    import { goto } from 'svelte-pathfinder'
	type $$Props = Props;
	type $$Events = Events;

    export let href: $$Props["href"] = undefined;
	let className: $$Props["class"] = undefined;
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
	export let builders: $$Props["builders"] = [];
	export { className as class };
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...$$restProps}
	on:click={() => goto(href)}
	on:keydown
>
	<slot />
</ButtonPrimitive.Root>

