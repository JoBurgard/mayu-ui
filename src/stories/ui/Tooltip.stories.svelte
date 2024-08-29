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

	let disabled = true;
</script>

<!--  -->
<Story name="Default">
	<Tooltip placement="right">
		<button type="button" class={buttonVariants()} slot="trigger" let:trigger use:melt={trigger}
			>Hover me</button
		>
		<p>This is a tooltip!</p>
	</Tooltip>
</Story>

<Story name="Disabled">
	<div class="inline-flex flex-col gap-2">
		{disabled ? 'Disabled' : 'Not disabled'}
		<button
			type="button"
			class={buttonVariants()}
			on:click={() => {
				disabled = !disabled;
			}}>Toggle disabled</button
		>
		<Tooltip {disabled}>
			<svelte:fragment slot="trigger" let:trigger>
				<button type="button" class={buttonVariants()} use:melt={trigger}>Hover me</button>
			</svelte:fragment>
			<p>This is a tooltip!</p>
		</Tooltip>
	</div>
</Story>

<Story name="Error">
	<Tooltip placement="bottom" status="error">
		<button type="button" class={buttonVariants()} slot="trigger" let:trigger use:melt={trigger}
			>Hover me</button
		>
		<p>This is an error message!</p>
	</Tooltip>
</Story>
