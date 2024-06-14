<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import Tooltip from '$lib/ui/tooltip/Tooltip.svelte';
	import type { ComponentProps } from 'svelte';

	export let errorMessage: string | undefined = undefined;
	export let placement: ComponentProps<Tooltip>['placement'] = 'bottom';

	let showMessage = false;
	let status: 'error' | undefined = undefined;

	$: status = errorMessage ? 'error' : undefined;
</script>

<Tooltip
	{placement}
	status="error"
	size="xs"
	bind:open={showMessage}
	onOpenChange={({ curr }) => curr}
	disabled={!errorMessage}
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
	<p>{errorMessage}</p>
</Tooltip>
