<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script context="module" lang="ts">
	export const meta = {
		title: 'Components/Button',
	};
</script>

<script lang="ts">
	import { buttonVariants } from '$lib/ui/button/';
	import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
	<button type="button" class={buttonVariants()}>Text</button>
</Story>
<Story name="Styles">
	<button type="button" class={buttonVariants({ variant: 'primary', size: 'base' })}>Text</button>
	<button type="button" class={buttonVariants({ variant: 'secondary', size: 'base' })}>Text</button>
	<button type="button" class={buttonVariants({ variant: 'neutral', size: 'base' })}>Text</button>
</Story>
<Story name="Sizes">
	<button type="button" class={buttonVariants({ size: 'xs' })}>Text</button>
	<button type="button" class={buttonVariants({ size: 'sm' })}>Text</button>
	<button type="button" class={buttonVariants({ size: 'base' })}>Text</button>
	<button type="button" class={buttonVariants({ size: 'lg' })}>Text</button>
	<button type="button" class={buttonVariants({ size: 'xl' })}>Text</button>
</Story>
