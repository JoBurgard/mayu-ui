<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import { dialogRegistry } from './Dialog.svelte';

	export let name: string;

	const {
		elements: { trigger },
		options,
	} = dialogRegistry.get(name);
</script>

<slot trigger={$trigger} {options} />
