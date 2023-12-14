<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>

SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Select from '$lib/ui/Select.svelte';
</script>

<Meta title="Components/Select" />

<Template let:args>
	<Select {...args} />
</Template>

<Story name="Default" args={{ options: ['Apples', 'Bananas', 'Pineapples'] }}></Story>
