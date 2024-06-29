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
	import { writable } from 'svelte/store';
	import FormError from '$lib/helper/form-error/FormError.svelte';

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

	let delayedValue = writable<undefined | string>();

	setTimeout(() => {
		$delayedValue = 'Delayed value';
	}, 1000);

	const dateAndTimes: { label: string; value: string }[] = [];
	const dateFormatter = new Intl.DateTimeFormat('en-EN', {
		weekday: 'long',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	});

	for (let dayOffset = 0; dayOffset <= 100; dayOffset += 1) {
		for (let hour = 0; hour < 24; hour += 1) {
			for (let minute = 0; minute < 60; minute += 15) {
				const date = new Date();
				date.setDate(date.getDate() + dayOffset);
				date.setHours(hour, minute, 0, 0);

				const comboboxItem = {
					label: dateFormatter.format(date),
					value: new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
						.toISOString()
						.slice(0, -5),
				};

				dateAndTimes.push(comboboxItem);
			}
		}
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
			valueToData={(it) => it}
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

<Story name="Delayed value from store">
	<h2>Selected Value</h2>
	<pre>{JSON.stringify($delayedValue, null, 2)}</pre>
	<div class="mt-4 flex flex-col gap-4 max-w-xs">
		<Combobox
			bind:value={$delayedValue}
			data={[]}
			valueToData={(value) => ({ a: value, b: value })}
			dataToOption={(it) => ({ label: it.a, value: String(it.b) })}
			createHaystack={(it) => `${it.a}${String(it.b)}`}
			placeholder="Find a word"
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
								alert('select');
							}}
							on:noselectenter={() => {
								alert('noselectenter');
							}}
							on:noselectblur={() => {
								alert('noselectblur');
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
								alert('select');
							}}
							on:noselectenter={() => {
								alert('noselectenter');
							}}
							on:noselectblur={() => {
								alert('noselectblur');
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

<Story name="Error">
	<FormError
		errorMessages={[
			'This is a very long error message! Please correct the input.',
			'And another one.',
		]}
		placement="right-end"
		let:status
	>
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
			{status}
		/></FormError
	>
</Story>

<Story name="Generated Data">
	<div class="inline-flex">
		<Combobox
			menuClasses="max-h-[145px]"
			size="sm"
			placeholder="Date & Time"
			value={undefined}
			data={dateAndTimes}
			dataToOption={(it) => ({ label: it.label, value: it.value })}
			valueToData={(value) => {
				const date = new Date(value);

				return date instanceof Date && !isNaN(date.getTime())
					? {
							label: date.toLocaleDateString('en-EN', {
								weekday: 'long',
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
								hour: '2-digit',
								minute: '2-digit',
							}),
							value,
						}
					: {
							label: '',
							value: '',
						};
			}}
			createHaystack={(it) => it.label}
			listSize={10}
		/>
	</div>
</Story>

<Story name="Empty Data List">
	<div class="inline-flex">
		<Combobox
			menuClasses="max-h-[145px]"
			size="sm"
			placeholder="Empty data list"
			value={undefined}
			data={[]}
		/>
	</div>
</Story>

<Story name="Overriden Messages">
	<div class="inline-flex gap-2">
		<Combobox
			menuClasses="max-h-[145px]"
			size="sm"
			placeholder="Fallback messages"
			value={undefined}
			data={[]}
			arbitraryValue
		/>
		<Combobox
			menuClasses="max-h-[145px]"
			size="sm"
			placeholder="Overriden Messages"
			value={undefined}
			data={[]}
			messages={{
				noSearchResult: 'Sorry, nothing was found! 😭',
				emptyList: 'Nothing to see here.',
			}}
			arbitraryValue
		/>
	</div>
</Story>
