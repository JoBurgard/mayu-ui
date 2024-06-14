<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import Tooltip from '$lib/ui/tooltip/Tooltip.svelte';
	import type { ComponentProps } from 'svelte';

	export let errorMessages: string[] | undefined = undefined;
	export let placement: ComponentProps<Tooltip>['placement'] = 'bottom';

	let showMessage = false;
	let status: 'error' | undefined = undefined;

	$: status = errorMessages?.length ? 'error' : undefined;
</script>

<Tooltip
	{placement}
	status="error"
	size="xs"
	bind:open={showMessage}
	onOpenChange={({ curr }) => curr}
	disabled={!errorMessages}
>
	<div
		class="inline-flex flex-col"
		slot="trigger"
		let:trigger
		{...trigger}
		on:focusin={() => (showMessage = true)}
		on:focusout={() => (showMessage = false)}
	>
		<slot {status} />
	</div>
	<ul class={Array.isArray(errorMessages) && errorMessages.length > 1 ? 'list-disc-inside' : ''}>
		{#each errorMessages || [] as message}
			<li>{message}</li>
		{/each}
	</ul>
</Tooltip>
