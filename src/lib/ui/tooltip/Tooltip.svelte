<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { tooltipVariants } from '.';

	export let placement:
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'right'
		| 'right-start'
		| 'right-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'left'
		| 'left-start'
		| 'left-end'
		| undefined = undefined;

	export let disabled = false;
	export let size: 'sm' | 'base' | 'lg' | 'xl' | undefined = undefined;

	const {
		elements: { trigger, content },
		states: { open },
	} = createTooltip({
		positioning: {
			placement,
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true,
	});
</script>

<slot name="trigger" trigger={disabled ? { action: () => {} } : $trigger} />
{#if $open && !disabled}
	<div use:melt={$content} transition:fade={{ duration: 100 }} class={tooltipVariants({ size })}>
		<slot />
	</div>
{/if}
