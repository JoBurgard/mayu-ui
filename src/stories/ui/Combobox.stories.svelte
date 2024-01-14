<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script context="module" lang="ts">
	export const meta = {
		title: 'Components/Combobox',
	};
</script>

<script lang="ts">
	import { buttonVariants } from '$lib';

	import Combobox from '$lib/ui/combobox/Combobox.svelte';
	import { Story } from '@storybook/addon-svelte-csf';
	import type { ComponentEvents } from 'svelte';

	let value: string | undefined;
	let onSelectData: ComponentEvents<Combobox<typeof value>>['select']['detail'];
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
			data={[
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
			]}
			toOption={(it) => ({ label: it, value: it, test: 'blub' })}
			createHaystack={(item) => item}
			placeholder="Find a word"
			on:select={(event) => {
				onSelectData = event.detail;
			}}
			{arbitraryValue}
		/>
	</div>
</Story>
