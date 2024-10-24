<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import { setContext } from 'svelte';

	export let resolve: (data: any) => void;
	export let reject: (reason: any) => void;
	setContext('resolve', resolve);
	setContext('reject', reject);
</script>

<slot />
