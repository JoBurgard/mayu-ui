<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->
<script lang="ts">
	import { createPagination } from '@melt-ui/svelte';
	import type { VariantProps } from 'tailwind-variants';
	import { buttonVariants } from '../button';
	import { tick } from 'svelte';

	export let size: VariantProps<typeof buttonVariants>['size'] = 'base';
	export let page: number;
	export let totalItems: number;
	export let perPage: number;
	export let onpagechange: (page: number) => void = () => {};

	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { pages, page: pageState },
	} = createPagination({
		count: totalItems,
		perPage,
		defaultPage: page,
		siblingCount: 1,
	});
</script>

<nav {...$root} use:root>
	<div class="flex gap-3">
		<button
			class={buttonVariants({ size })}
			{...$prevButton}
			use:prevButton
			on:m-click={() => tick().then(() => onpagechange($pageState))}
			><div class="px-1">
				<div class="i-lucide-chevron-left size-4" />
			</div></button
		>
		<div class="flex gap-1.5 items-center">
			{#each $pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<div class="i-lucide-more-horizontal opacity-50" />
				{:else}
					<button
						class={buttonVariants({
							size,
							variant: $pageTrigger(page)['data-selected'] !== undefined ? 'primary' : 'neutral',
							class: 'min-w-8',
						})}
						{...$pageTrigger(page)}
						use:pageTrigger
						on:m-click={() => tick().then(() => onpagechange($pageState))}>{page.value}</button
					>
				{/if}
			{/each}
		</div>
		<button
			class={buttonVariants({ size })}
			{...$nextButton}
			use:nextButton
			on:m-click={() => tick().then(() => onpagechange($pageState))}
			><div class="px-1">
				<div class="i-lucide-chevron-right size-4" />
			</div></button
		>
	</div>
</nav>
