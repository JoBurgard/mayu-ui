<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	export let value: string;
</script>

<!-- TODO forward events -->
<div class="input-container">
	<input class="input" type="text" bind:value {...$$restProps} />
</div>
