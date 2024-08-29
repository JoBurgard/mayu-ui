<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script context="module" lang="ts">
	export const meta = {
		title: 'Components/Input',
	};
</script>

<script lang="ts">
	import { buttonVariants } from '$lib';

	import FormError from '$lib/helper/form-error/FormError.svelte';

	import { Input, inputVariants } from '$lib/ui/input/';
	import { Story } from '@storybook/addon-svelte-csf';
	import { tick } from 'svelte';
	import { writable } from 'svelte/store';

	let errors = writable<Record<string, any>>({ test: {} });
</script>

<!--  -->
<Story name="Text"
	><div class="flex flex-col gap-4 max-w-xs">
		<input type="text" class={inputVariants({ size: 'xs' })} placeholder="Input text here" />
		<input type="text" class={inputVariants({ size: 'sm' })} placeholder="Input text here" />
		<input type="text" class={inputVariants({ size: 'base' })} placeholder="Input text here" />
		<input type="text" class={inputVariants({ size: 'lg' })} placeholder="Input text here" />
		<input type="text" class={inputVariants({ size: 'xl' })} placeholder="Input text here" />
		<Input size="xs" placeholder="Input text here" />
		<Input size="sm" placeholder="Input text here" />
		<Input placeholder="Input text here" />
		<Input size="lg" placeholder="Input text here" />
		<Input size="xl" placeholder="Input text here" />
	</div>
</Story>

<Story name="Unstyled">
	<input class={inputVariants({ unstyled: true })} type="text" />
</Story>

<Story name="Error">
	<div class="flex gap-2">
		<button
			class={buttonVariants()}
			type="button"
			on:click={() => {
				$errors.test.input1 = ['This is an error message.', "And don't forget to fix this."];
				tick().then(() => {
					document.querySelector('[aria-invalid]')?.focus();
				});
			}}>Set Error1</button
		>
		<button
			class={buttonVariants()}
			type="button"
			on:click={() => {
				$errors.test.input2 = ['This is an error message.'];
				tick().then(() => {
					document.querySelector('[aria-invalid]')?.focus();
				});
			}}>Set Error2</button
		>
	</div>
	<hr class="my-4" />
	<div class="flex gap-2">
		<FormError errorMessages={$errors?.test?.input1} let:status
			><Input placeholder="Input1" {status} /></FormError
		>
		<FormError errorMessages={$errors?.test?.input2} let:status
			><Input placeholder="Input2" {status} /></FormError
		>
	</div>
</Story>
