<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import { createSync, createTooltip, melt, type CreateTooltipProps } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import type { VariantProps } from 'tailwind-variants';
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
	export let open = false;
	export let disabled = false;
	export let size: VariantProps<typeof tooltipVariants>['size'] = undefined;
	export let status: VariantProps<typeof tooltipVariants>['status'] = undefined;
	export let onOpenChange: CreateTooltipProps['onOpenChange'] = ({ next }) => next;

	const {
		elements: { trigger, content },
		states,
	} = createTooltip({
		positioning: {
			placement,
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true,
		onOpenChange,
	});

	const sync = createSync(states);
	sync.open(open, (value) => (open = value));
</script>

<slot name="trigger" trigger={disabled ? { action: () => {} } : $trigger} />
{#if open && !disabled}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class={tooltipVariants({ size, status })}
	>
		<slot />
	</div>
{/if}
