<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import { buttonVariants } from '$lib';
	import { getContext } from 'svelte';

	export let title = 'Confirm';
	export let text = 'Do you want to proceed?';

	const resolve = getContext<(value: any) => void>('resolve');
</script>

<h1 class="font-bold text-lg">{title}</h1>
<p>{text}</p>
<div class="flex justify-end gap-2">
	<button
		type="button"
		class={buttonVariants()}
		on:click={() => {
			resolve(false);
		}}>Cancel</button
	>
	<button
		type="button"
		class={buttonVariants({ variant: 'primary' })}
		on:click={() => {
			resolve(true);
		}}>Ok</button
	>
</div>
