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
	import Combobox from '$lib/ui/combobox/Combobox.svelte';
	import { Story } from '@storybook/addon-svelte-csf';

	let value;
</script>

<Story name="Default">
	<pre>{JSON.stringify(value, null, 2)}</pre>
	<div class="flex flex-col gap-4 max-w-xs">
		<Combobox
			bind:value
			data={[
				{ label: 'EnragedEnragedEnragedEnragedEnragedEnraged' },
				{ label: 'Gorgeous' },
				{ label: 'Massive' },
				{ label: 'Dull' },
				{ label: 'Deafening' },
				{ label: 'Destitute' },
				{ label: 'emptySpaces' },
				{ label: 'empty Spaces' },
				{ label: 'Stingy' },
				{ label: 'Spotless' },
				{ label: 'Furious' },
				{ label: 'Exquisite' },
				{ label: 'Luminous' },
				{ label: 'Brilliant' },
				{ label: 'Pedantic' },
				{ label: 'Terrible' },
				{ label: 'Incredibly' },
				{ label: 'Supersmart' },
				{ label: 'Seething' },
				{ label: 'Outraged' },
				{ label: 'Mindnumbing' },
				{ label: 'Incensed' },
				{ label: 'Huge' },
				{ label: 'Radiant' },
				{ label: 'Awful' },
				{ label: 'Lovely' },
				{ label: 'Colossal' },
				{ label: 'Livid' },
				{ label: 'Severely' },
				{ label: 'Tremendous' },
				{ label: 'Abominable' },
				{ label: 'Exceedingly' },
			]}
			createHaystack={(data) => data.map((item) => item.label)}
			preprocess
			placeholder="Find a word"
		/>
	</div>
</Story>
