<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script context="module" lang="ts">
	import ContextMenu from '$lib/ui/contextMenu/ContextMenu.svelte';
	import { melt } from '@melt-ui/svelte';
	import { Story } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { writable } from 'svelte/store';
	export const meta: Meta<typeof ContextMenu> = {
		title: 'Components/ContextMenu',
	};
</script>

<script>
	let checkboxChecked = writable(true);
</script>

<Story name="Default">
	<ContextMenu
		title="Testmenu"
		items={[
			{
				type: 'action',
				text: 'Action Item',
				hotkey: ['Ctrl', 'T'],
				oninput() {
					alert('Action!');
				},
			},
			{
				type: 'checkbox',
				text: 'Checkbox Item',
				value: checkboxChecked,
				hotkey: ['Shift', 'P'],
			},
		]}
		let:trigger
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			tabindex="0"
			class="inline-block b-dashed border-2 rounded-lg p-6"
			use:melt={trigger}
			aria-label="Right click for context menu"
		>
			Context Area (Right click)
		</div>
	</ContextMenu>
</Story>
