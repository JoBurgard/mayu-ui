<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

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

<slot name="trigger" trigger={$trigger} />
{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class="px-4 py-1 rounded-lg bg-white shadow-md"
	>
		<slot />
	</div>
{/if}
