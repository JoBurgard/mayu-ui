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

	const sizes = ['xs', 'sm', 'base', 'lg', 'xl'] as const;
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
	let arbitraryValue = true;

	let externalData: { a: string; b: number }[] = [];
	let isLoading = false;
	function fakeFetch() {
		externalData = [];
		isLoading = true;
		setTimeout(() => {
			externalData = [
				{ a: 'abc', b: 123 },
				{ a: 'def', b: 456 },
				{ a: 'ghi', b: 789 },
			];
			isLoading = false;
		}, 500);
	}
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
				<div>
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
			</div>
		{/each}
	</div>
</Story>

<Story name="Loading external Data">
	<h2>Selected Value</h2>
	<pre>{JSON.stringify(value, null, 2)}</pre>
	<div class="mt-4 flex flex-col gap-4 max-w-xs">
		<Combobox
			bind:value
			data={externalData}
			dataToOption={(it) => ({ label: it.a, value: String(it.b) })}
			createHaystack={(it) => `${it.a}${String(it.b)}`}
			placeholder="Find a word"
			on:select={(event) => {
				onSelectData = event.detail;
			}}
			on:input={() => {
				fakeFetch();
			}}
			arbitraryValue
			{isLoading}
		/>
	</div>
</Story>

<Story name="Unstyled">
	<h2>Selected Value</h2>
	<pre>{JSON.stringify(value, null, 2)}</pre>
	<form on:submit|preventDefault={() => alert('Form was submitted. This should not happen.')}>
		<table class="mt-4 w-full max-w-sm prose prose-truegray border-collapse">
			<thead>
				<th>ID</th>
				<th>Combobox</th>
			</thead>
			<tbody>
				<tr>
					<td class="p-0 leading-none text-center">1</td>
					<td class="p-0 leading-none"
						><Combobox
							bind:value
							data={externalData}
							dataToOption={(it) => ({ label: it.a, value: String(it.b) })}
							valueToData={(value) => ({ a: value, b: Number(value) })}
							createHaystack={(it) => `${it.a}${String(it.b)}`}
							on:select={(event) => {
								onSelectData = event.detail;
							}}
							on:input={() => {
								fakeFetch();
							}}
							arbitraryValue
							{isLoading}
							unstyled
						/></td
					>
				</tr>
			</tbody>
		</table>
		<table class="mt-4 w-full max-w-sm text-sm prose prose-truegray border-collapse">
			<thead>
				<th>ID</th>
				<th>Combobox</th>
			</thead>
			<tbody>
				<tr>
					<td class="p-0 leading-none text-center">1</td>
					<td class="p-0 leading-none" style="width:90.5001px;height:20px"
						><Combobox
							class="px-2.5 py-1 h-full"
							name="test"
							bind:value
							data={externalData}
							dataToOption={(it) => ({ label: it.a, value: String(it.b) })}
							valueToData={(value) => ({ a: value, b: Number(value) })}
							createHaystack={(it) => `${it.a}${String(it.b)}`}
							on:select={(event) => {
								onSelectData = event.detail;
							}}
							on:input={() => {
								fakeFetch();
							}}
							size="xs"
							arbitraryValue
							{isLoading}
							unstyled
							hideClearButton
							hideChevronIcon
						/></td
					>
				</tr>
			</tbody>
		</table>
	</form>
</Story>
