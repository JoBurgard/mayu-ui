<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script>
	import { buttonVariants } from '$lib/ui/button/';
	import { Input } from '$lib/ui/input/';
	import Select from '$lib/ui/select/Select.svelte';
	import { Tooltip } from '$lib/ui/tooltip';
	import { melt } from '@melt-ui/svelte';
</script>

<div class="w-2xl h-sm bg-red-500 -z-1 fixed top-12 left-12"></div>
<div class="flex flex-col gap-6">
	<div class="flex flex-col gap-2 items-start">
		<button class={buttonVariants()} type="button">Button</button>
		<button class={buttonVariants({ '3d': true })} type="button">Button</button>
		<button class={buttonVariants()} type="button">Button</button>
	</div>
	<div><Input type="text" placeholder="Textfield" /></div>
	<div>
		<Select options={['Apples', 'Bananas', 'Pineapples']} />
	</div>
	<div class="flex relative isolate">
		<div class="z-10 bg-green-500 absolute left-30 top-2">z-10</div>
		<Tooltip placement="right">
			<button type="button" class={buttonVariants()} slot="trigger" let:trigger use:melt={trigger}
				>Hover me</button
			>
			<p>This is a tooltip!</p>
		</Tooltip>
	</div>
</div>
