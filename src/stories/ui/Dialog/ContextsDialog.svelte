<!--
SPDX-FileCopyrightText: 2025 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import { buttonVariants } from '$lib';
	import { getContext } from 'svelte';

	const resolve = getContext<(value: any) => void>('resolve');
	const someContext = getContext('someContext');
</script>

<h1 class="font-bold text-lg">Context passed to component:</h1>
<ul>
	<li><b>someContext</b> {someContext}</li>
</ul>
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
