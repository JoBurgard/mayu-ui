<script lang="ts">
	import { buttonVariants, Input } from '$lib';
	import { getContext } from 'svelte';

	export let value = '';
	export let placeholder = 'Text...';
	export let title = 'Text Input';
	export let description = 'Please enter your text:';

	const resolve = getContext<(value: any) => void>('resolve');
	const reject = getContext<(reason?: any) => void>('reject');
</script>

<h1 class="font-bold text-lg">{title}</h1>
<p>{description}</p>

<Input bind:value {placeholder} />

<div class="flex justify-end gap-2">
	<button
		type="button"
		class={buttonVariants()}
		on:click={() => {
			reject();
		}}>Cancel</button
	>
	<button
		type="button"
		class={buttonVariants({ variant: 'primary' })}
		on:click={() => {
			resolve(value);
		}}>Ok</button
	>
</div>
