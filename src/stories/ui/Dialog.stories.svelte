<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script context="module" lang="ts">
	export const meta = {
		title: 'Components/Dialog',
	};
</script>

<script lang="ts">
	import { Dialog } from '$lib';
	import { buttonVariants } from '$lib/ui/button/';
	import DialogTrigger from '$lib/ui/dialog/DialogTrigger.svelte';
	import { melt } from '@melt-ui/svelte';
	import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
	<DialogTrigger name="default" let:trigger>
		<button type="button" class={buttonVariants()} use:melt={trigger}>Press me</button>
	</DialogTrigger>
	<Dialog name="default">
		<p>This is a Dialog!</p>
	</Dialog>
</Story>
