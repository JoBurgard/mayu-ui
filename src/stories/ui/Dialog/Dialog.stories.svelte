<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script context="module" lang="ts">
	export const meta = {
		title: 'Components/Dialog',
	} satisfies MetaProps;
</script>

<script lang="ts">
	import { Dialog } from '$lib';
	import { buttonVariants } from '$lib/ui/button/';
	import DialogProvider, { dialogs } from '$lib/ui/dialog/DialogProvider.svelte';
	import DialogTrigger from '$lib/ui/dialog/DialogTrigger.svelte';
	import { melt } from '@melt-ui/svelte';
	import { Story, type MetaProps } from '@storybook/addon-svelte-csf';
	import ComplexDialog from './ComplexDialog.svelte';
	import ConfirmDialog from './ConfirmDialog.svelte';
	import ContextsDialog from './ContextsDialog.svelte';
</script>

<!--  -->
<Story name="Default">
	<DialogTrigger name="default" let:triggerBuilder>
		<button type="button" class={buttonVariants()} use:melt={triggerBuilder}>Press me</button>
	</DialogTrigger>
	<Dialog name="default">
		<p>This is a Dialog!</p>
	</Dialog>
</Story>

<Story name="Provider Store">
	<DialogProvider />
	<button
		type="button"
		class={buttonVariants()}
		on:click={async (event) => {
			const result = await dialogs.prompt(ConfirmDialog).catch(() => false); // catch has fallback value
			event.target.innerText = `Returned: ${result}`;
		}}>Confirm Dialog</button
	>
	<button
		type="button"
		class={buttonVariants()}
		on:click={async (event) => {
			const result = await dialogs
				.prompt(ConfirmDialog, {
					props: {
						title: 'Important Decision',
						text: 'Do you really want to proceed? (This cannot be closed with an outside click.)',
					},
					settings: {
						options: {
							closeOnOutsideClick: false,
						},
					},
				})
				.catch(() => false); // catch has fallback value
			event.target.innerText = `Returned: ${result}`;
		}}>Important Confirm Dialog</button
	>
	<button
		type="button"
		class={buttonVariants()}
		on:click={async (event) => {
			const result = await dialogs.prompt(ComplexDialog).catch(() => null); // catch has fallback value
			event.target.innerText = `Returned: ${result}`;
		}}>Complex Dialog</button
	>

	<button
		type="button"
		class={buttonVariants()}
		on:click={async (event) => {
			const result = await dialogs
				.prompt(ContextsDialog, {
					settings: {
						options: {
							closeOnOutsideClick: false,
						},
					},
					contexts: new Map(
						Object.entries({ someContext: 'This was passed at the dialogs prompt area.' }),
					),
				})
				.catch(() => false); // catch has fallback value
			event.target.innerText = `Returned: ${result}`;
		}}>Passing Contexts</button
	>
</Story>
