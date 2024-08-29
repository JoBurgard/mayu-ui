<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script context="module" lang="ts">
	export const meta = {
		title: 'Components/Select',
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Select from '$lib/ui/select/Select.svelte';
</script>

<Template let:args>
	<Select {...args} />
</Template>

<!-- Work in Progress -->
<Story name="Default" args={{ options: ['Apples', 'Bananas', 'Pineapples'] }}></Story>
