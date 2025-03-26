<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import { setContext } from 'svelte';

	export let resolve: (data: any) => void;
	export let reject: (reason: any) => void;
	export let contexts: Map<any, any> | undefined = undefined;

	setContext('resolve', resolve);
	setContext('reject', reject);
	if (contexts) {
		for (const [name, value] of contexts) {
			setContext(name, value);
		}
	}
</script>

<slot />
