<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts" generics="T">
	import { inputVariants } from '../input/';

	export let options: Array<T> = [];
	export let required: boolean | undefined = undefined;

	export let getValue = (option: T): any => option;
	export let getText = (option: T): string => String(option);
</script>

<!-- TODO forward events -->
<div class="relative">
	<select class="appearance-none {inputVariants()} bg-white pr-8" {required} {...$$restProps}>
		{#each options as option}
			{@const value = getValue(option)}
			{@const text = getText(option)}
			<option {value}>{text}</option>
		{/each}
	</select>
	<div class="i-lucide-chevrons-up-down absolute right-2 top-1/2 -translate-y-1/2" />
</div>
