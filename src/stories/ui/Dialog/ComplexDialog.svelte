<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import { buttonVariants, dialogs } from '$lib';
	import { getContext } from 'svelte';
	import TextfieldDialog from './TextfieldDialog.svelte';

	let availableFruits: string[] = ['Apple', 'Banana', 'Orange'];
	let selectedFruits: string[] = [];

	const resolve = getContext<(value: any) => void>('resolve');
</script>

<h1 class="font-bold text-lg">What do you pick?</h1>
<div class="flex flex-col gap-2">
	{#each availableFruits as fruit, index}
		<div class="flex gap-2">
			<label><input type="checkbox" bind:group={selectedFruits} value={fruit} /> {fruit}</label>
			<button
				class={buttonVariants({ variant: 'ghost', size: 'xs', class: 'p-1' })}
				on:click={async () => {
					const newText = await dialogs
						.prompt(TextfieldDialog, {
							description: 'Change Fruit name',
							value: fruit,
						})
						.catch(() => fruit);

					availableFruits[index] = newText;
				}}><div class="i-lucide-pen size-4"></div></button
			>
		</div>
	{/each}
</div>
<div class="flex justify-end gap-2">
	<button
		type="button"
		class={buttonVariants()}
		on:click={() => {
			resolve(null);
		}}>Cancel</button
	>
	<button
		type="button"
		class={buttonVariants({ variant: 'primary' })}
		on:click={() => {
			resolve(selectedFruits);
		}}>Ok</button
	>
</div>
