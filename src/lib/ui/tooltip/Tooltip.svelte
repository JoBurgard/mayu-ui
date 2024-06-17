<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import { createSync, createTooltip, melt, type CreateTooltipProps } from '@melt-ui/svelte';
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
	export let onOpenChange: Required<CreateTooltipProps>['onOpenChange'] = ({ next }) => next;
	export let openDelay: Required<CreateTooltipProps>['openDelay'] = 0;
	export let closeDelay: Required<CreateTooltipProps>['closeDelay'] = 0;

	const {
		elements: { trigger, content },
		states,
	} = createTooltip({
		positioning: {
			placement,
		},
		openDelay,
		closeDelay,
		closeOnPointerDown: false,
		forceVisible: true,
		onOpenChange: (params) => {
			if (disabled) {
				return params.curr;
			}
			return onOpenChange(params);
		},
	});

	const sync = createSync(states);
	sync.open(open, (value) => (open = value));
</script>

<slot name="trigger" trigger={$trigger} />
{#if open && !disabled}
	<div use:melt={$content} class={tooltipVariants({ size, status })}>
		<slot />
	</div>
{/if}
