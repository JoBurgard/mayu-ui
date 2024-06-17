<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts" context="module">
	import {
		createPopover,
		type CreatePopoverProps,
		type Popover as PopoverType,
	} from '@melt-ui/svelte';

	let registryCounter = 0;

	function generateRegistryName() {
		registryCounter += 1;
		return String(registryCounter);
	}

	function createPopoverRegistry() {
		const registry = new Map<string, PopoverType>();

		function get(name: string, props?: CreatePopoverProps) {
			if (!registry.has(name)) {
				const popover = createPopover(props);
				registry.set(name, popover);
			}

			return registry.get(name) as PopoverType;
		}

		function set(name: string, popover: PopoverType) {
			registry.set(name, popover);
		}

		function remove(name: string) {
			registry.delete(name);
		}

		return {
			get,
			set,
			remove,
		};
	}

	export const popoverRegistry = createPopoverRegistry();
</script>

<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import type { VariantProps } from 'tailwind-variants';
	import { popoverVariants } from '.';
	import { onDestroy } from 'svelte';

	export let name: string = generateRegistryName();
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
	export let size: VariantProps<typeof popoverVariants>['size'] = undefined;
	export let status: VariantProps<typeof popoverVariants>['status'] = undefined;

	const {
		elements: { trigger, content, close },
		states: { open },
	} = popoverRegistry.get(name, { positioning: { placement } });

	onDestroy(() => popoverRegistry.remove(name));
</script>

<slot name="trigger" trigger={$trigger} />
{#if $open}
	<div
		class={popoverVariants({ size, status })}
		use:melt={$content}
		transition:fade={{ duration: 100 }}
	>
		<slot close={$close} />
	</div>
{/if}
