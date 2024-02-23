<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';
	export const meta: Meta<typeof Combobox> = {
		title: 'Components/Combobox',
	};
</script>

<script lang="ts">
	import { buttonVariants } from '$lib';

	import Combobox from '$lib/ui/combobox/Combobox.svelte';
	import { Story } from '@storybook/addon-svelte-csf';
	import type { ComponentEvents } from 'svelte';

	const sizes = ['sm', 'base', 'lg', 'xl'] as const;
	const data = [
		'EnragedEnragedEnragedEnragedEnragedEnraged',
		'Gorgeous',
		'Massive',
		'Dull',
		'Deafening',
		'Destitute',
		'emptySpaces',
		'empty Spaces',
		'Stingy',
		'Spotless',
		'Furious',
		'Exquisite',
		'Luminous',
		'Brilliant',
		'Pedantic',
		'Terrible',
		'Incredibly',
		'Supersmart',
		'Seething',
		'Outraged',
		'Mindnumbing',
		'Incensed',
		'Huge',
		'Radiant',
		'Awful',
		'Lovely',
		'Colossal',
		'Livid',
		'Severely',
		'Tremendous',
		'Abominable',
		'Exceedingly',
	];
	let value: string | undefined;
	let onSelectData: ComponentEvents<Combobox<typeof value, typeof value>>['select']['detail'];
	let arbitraryValue: boolean = true;
</script>

<Story name="Default">
	<h2>Selected Value</h2>
	<pre>{JSON.stringify(value, null, 2)}</pre>
	<h2>onSelect</h2>
	<pre>{JSON.stringify(onSelectData, null, 2)}</pre>
	<div class="flex gap-4">
		<button
			class={buttonVariants()}
			on:click={() => {
				value = 'Huge';
			}}>Change to 'Huge'</button
		>
		<button
			class={buttonVariants()}
			on:click={() => {
				value = 'This is unknown';
			}}>Change to 'This is unknown'</button
		>
		<button
			class={buttonVariants()}
			on:click={() => {
				value = undefined;
			}}>Change to 'undefined'</button
		>
		<button
			class={buttonVariants()}
			on:click={() => {
				value = '';
			}}>Change to '' (empty string)</button
		>
	</div>
	<div>
		<label><input type="checkbox" bind:checked={arbitraryValue} /> arbitraryValue</label>
	</div>
	<div class="mt-4 flex flex-col gap-4 max-w-xs">
		<Combobox
			bind:value
			{data}
			dataToOption={(it) => ({ label: it, value: it, test: 'blub' })}
			createHaystack={(item) => item}
			placeholder="Find a word"
			on:select={(event) => {
				onSelectData = event.detail;
			}}
			{arbitraryValue}
		/>
	</div>
</Story>

<Story name="Sizes">
	<div class="flex gap-4">
		{#each sizes as size}
			<div class="flex flex-col gap-2">
				<h2>{size}</h2>
				<Combobox
					bind:value
					{data}
					dataToOption={(it) => ({ label: it, value: it, test: 'blub' })}
					createHaystack={(item) => item}
					placeholder="Find a word"
					on:select={(event) => {
						onSelectData = event.detail;
					}}
					arbitraryValue
					{size}
				/>
			</div>
		{/each}
	</div>
</Story>
