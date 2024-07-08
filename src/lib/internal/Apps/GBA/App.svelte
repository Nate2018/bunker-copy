<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.ts";

    let position = "https://ilovemath.pics/";
</script>

<div class="w-full h-[92%]">
    <!-- svelte-ignore a11y-missing-attribute -->
    <iframe id="iframe" class="border-8 border-secondary w-full h-full" src="{position}" />
</div>
<div class="flex justify-center mt-2">
<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button variant="outline" builders={[builder]}>Select GBA Version</Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56">
      <DropdownMenu.RadioGroup bind:value={position}>
        <DropdownMenu.RadioItem value="https://cattn.github.io/gba">1.0</DropdownMenu.RadioItem>
        <DropdownMenu.RadioItem value="https://math-study.github.io/gba">2.0</DropdownMenu.RadioItem>
        <DropdownMenu.RadioItem value="https://ilovemath.pics/">3.0</DropdownMenu.RadioItem>
      </DropdownMenu.RadioGroup>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>