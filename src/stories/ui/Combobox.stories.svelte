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

	let value: string;
</script>

<Story name="Default">
	<pre>{JSON.stringify(value, null, 2)}</pre>
	<div>
		<button
			class={buttonVariants()}
			on:click={() => {
				value = 'Huge';
			}}>Change to 'Huge'</button
		>
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
			toOption={(it) => ({ label: it, value: it })}
			createHaystack={(item) => item}
			placeholder="Find a word"
		/>
	</div>
</Story>
