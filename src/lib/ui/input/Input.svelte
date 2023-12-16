<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense

Based on the Input Component from:
https://github.com/huntabyte/shadcn-svelte
-->

<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { inputVariants, type InputEvents } from '.';

	type $$Props = HTMLInputAttributes;
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = undefined;
	export let placeholder: $$Props['placeholder'] = undefined;
	export { className as class };
</script>

<label class="relative inline-block group">
	<input
		class={inputVariants({
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
	<!-- TODO text color from theme -->
	<!-- TODO color transition -->
	<span
		class="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition transition-property-[top,font-size,line-height] [input:not(:placeholder-shown)~&,input:focus~&]:(text-gray-700 bg-white px-1 -ml-1 rounded text-xs top-0)"
		>{placeholder || ''}</span
	>
</label>
