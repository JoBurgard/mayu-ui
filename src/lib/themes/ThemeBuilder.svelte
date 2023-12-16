<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script>
	import Label from '$lib/ui/Label.svelte';
	import Select from '$lib/ui/select/Select.svelte';
	import { buttonVariants } from '$lib/ui/button';
	import { Input } from '$lib/ui/input';
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
		<Label text="Fruit">
			<Select options={['Apples', 'Bananas', 'Pineapples']} />
		</Label>
	</div>
</div>
