<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts" context="module">
	import { createDialog, type CreateDialogProps, type Dialog as DialogType } from '@melt-ui/svelte';
	function createDialogRegistry() {
		const registry = new Map<string, DialogType>();

		function get(name: string, props?: CreateDialogProps) {
			if (!registry.has(name)) {
				const dialog = createDialog(props);
				registry.set(name, dialog);
			}

			return registry.get(name) as DialogType;
		}

		function set(name: string, dialog: DialogType) {
			registry.set(name, dialog);
		}

		return {
			get,
			set,
		};
	}

	export const dialogRegistry = createDialogRegistry();
</script>

<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { dialogOverlayVariants, dialogVariants } from '.';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let name: string;

	const {
		elements: { portalled, title, content, description, close, overlay },
		states: { open },
	} = dialogRegistry.get(name);
</script>

{#if $open}
	<div class="isolate" use:melt={$portalled}>
		<div
			use:melt={$overlay}
			class={dialogOverlayVariants()}
			transition:fade={{ duration: 60, easing: quintOut }}
		/>
		<div
			class={dialogVariants()}
			use:melt={$content}
			transition:fly={{ y: -30, duration: 150, easing: quintOut }}
		>
			<slot title={$title} description={$description} close={$close} />
		</div>
	</div>
{/if}
