<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense

Based on the Input Component from:
https://github.com/huntabyte/shadcn-svelte
-->

<script lang="ts">
	import { inputVariants, type InputEvents, type InputProps, inputPlaceholderVariants } from './';

	type $$Props = InputProps;
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let value: $$Props['value'] = undefined;
	export let placeholder: $$Props['placeholder'] = undefined;
	export let size: $$Props['size'] = undefined;
	export let status: $$Props['status'] = undefined;
</script>

<label class="relative block">
	<input
		class={inputVariants({
			size,
			status,
			class: ['placeholder-transparent w-full', className],
		})}
		bind:value
		on:blur
		on:change
		on:click
		on:focus
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:paste
		on:input
		{placeholder}
		{...$$restProps}
	/>
	{#if placeholder}<span class={inputPlaceholderVariants({ size })}>{placeholder}</span>{/if}
</label>
