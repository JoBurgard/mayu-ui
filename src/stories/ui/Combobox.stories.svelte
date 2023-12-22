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
</script>

<Story name="Default">
	<div class="flex flex-col gap-4 max-w-xs">
		<Combobox
			data={[{ label: 'Option1' }, { label: 'Option2' }]}
			createHaystack={(data) => data.map((item) => item.label)}
			preprocess
			placeholder="Unternehmen"
		/>
	</div>
</Story>
