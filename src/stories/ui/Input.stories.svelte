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
	import { Input, inputVariants } from '$lib/ui/input/index.js';
	import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Text"
	><div class="flex flex-col gap-4 max-w-xs">
		<input type="text" class={inputVariants({ size: 'sm' })} placeholder="Input text here" />
		<input type="text" class={inputVariants({ size: 'base' })} placeholder="Input text here" />
		<input type="text" class={inputVariants({ size: 'lg' })} placeholder="Input text here" />
		<input type="text" class={inputVariants({ size: 'xl' })} placeholder="Input text here" />
		<Input size="sm" placeholder="Input text here" />
		<Input placeholder="Input text here" />
		<Input size="lg" placeholder="Input text here" />
		<Input size="xl" placeholder="Input text here" />
	</div>
</Story>
