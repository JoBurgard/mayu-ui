<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script context="module" lang="ts">
	export const meta = {
		title: 'Components/Popover',
	};
</script>

<script lang="ts">
	import { buttonVariants } from '$lib/ui/button/';
	import { Popover } from '$lib/ui/popover/';
	import { melt } from '@melt-ui/svelte';
	import { Story } from '@storybook/addon-svelte-csf';

	let open = false;
</script>

<!--  -->
<Story name="Default">
	<Popover placement="right">
		<button type="button" class={buttonVariants()} slot="trigger" let:trigger use:melt={trigger}
			>Press me</button
		>
		<p>This is a Popover!</p>
	</Popover>
</Story>

<Story name="Outside Toggle">
	<div class="inline-flex flex-col gap-2">
		Open: {open}
		<button type="button" class={buttonVariants()} on:click={() => (open = !open)}>Toggle</button>
		<Popover {open} placement="right">
			<button type="button" class={buttonVariants()} slot="trigger" let:trigger use:melt={trigger}
				>Press me</button
			>
			<p>This is a Popover!</p>
		</Popover>
	</div>
</Story>
