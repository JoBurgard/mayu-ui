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

<!-- -->
<Story name="Primary">
	<button type="button" class={buttonVariants({ variant: 'primary' })}>Button</button>
</Story>
<Story name="Enabled / Disabled">
	<h2>Enabled</h2>
	<div class="flex gap-4">
		<button type="button" class={buttonVariants()}>Button</button>
		<a href="#1" class={buttonVariants()}>Link</a>
	</div>
	<h2>Disabled</h2>
	<div class="flex gap-4">
		<button type="button" class={buttonVariants()} disabled>Button</button>
		<a href="#1" class={buttonVariants()} data-disabled>Link</a>
	</div>
</Story>
<Story name="Styles">
	<button type="button" class={buttonVariants({ variant: 'primary', size: 'base' })}>Text</button>
	<button type="button" class={buttonVariants({ variant: 'secondary', size: 'base' })}>Text</button>
	<button type="button" class={buttonVariants({ variant: 'neutral', size: 'base' })}>Text</button>
	<button type="button" class={buttonVariants({ variant: 'ghost', size: 'base' })}>Text</button>
</Story>
<Story name="Sizes">
	<button type="button" class={buttonVariants({ size: 'xs' })}>Text</button>
	<button type="button" class={buttonVariants({ size: 'sm' })}>Text</button>
	<button type="button" class={buttonVariants({ size: 'base' })}>Text</button>
	<button type="button" class={buttonVariants({ size: 'lg' })}>Text</button>
	<button type="button" class={buttonVariants({ size: 'xl' })}>Text</button>
</Story>
