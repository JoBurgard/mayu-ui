<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import { popoverRegistry } from './Popover.svelte';

	export let name: string;

	const {
		elements: { trigger },
		options,
	} = popoverRegistry.get(name);
</script>

<slot trigger={$trigger} {options} />
