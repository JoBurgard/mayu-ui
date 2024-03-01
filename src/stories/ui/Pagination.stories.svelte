<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script context="module" lang="ts">
	import { Pagination } from '$lib';

	export const meta = {
		title: 'Components/Pagination',
		component: Pagination,
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';

	const page = 1;
	const totalItems = 100;
	const perPage = 10;

	let selectedPage: number;
</script>

<Story name="Default">
	<div class="flex flex-col gap-4">
		<Pagination size="xs" {page} {totalItems} {perPage} />
		<Pagination size="sm" {page} {totalItems} {perPage} />
		<Pagination size="base" {page} {totalItems} {perPage} />
		<Pagination size="lg" {page} {totalItems} {perPage} />
		<Pagination size="xl" {page} {totalItems} {perPage} />
	</div>
</Story>

<Story name="onpagechange">
	<div class="flex flex-col gap-4">
		Selected Page: {selectedPage}
		<Pagination
			size="sm"
			{page}
			{totalItems}
			{perPage}
			onpagechange={(page) => (selectedPage = page)}
		/>
	</div>
</Story>
