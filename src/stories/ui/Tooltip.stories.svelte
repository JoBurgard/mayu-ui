<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script context="module" lang="ts">
	export const meta = {
		title: 'Components/Tooltip',
	};
</script>

<script lang="ts">
	import { buttonVariants } from '$lib/ui/button/';
	import { Tooltip } from '$lib/ui/tooltip';
	import { melt } from '@melt-ui/svelte';
	import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
	<Tooltip placement="right">
		<button type="button" class={buttonVariants()} slot="trigger" let:trigger use:melt={trigger}
			>Hover me</button
		>
		<p>This is a tooltip!</p>
	</Tooltip>
</Story>
