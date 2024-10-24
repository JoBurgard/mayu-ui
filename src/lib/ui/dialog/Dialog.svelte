<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts" context="module">
	import {
		createDialog,
		createSync,
		type CreateDialogProps,
		type Dialog as DialogType,
	} from '@melt-ui/svelte';

	let count = 0;
	function generateName() {
		count += 1;
		return `__dialog_${count}`;
	}

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

		function remove(name: string) {
			registry.delete(name);
		}

		return {
			get,
			set,
			remove,
		};
	}

	export const dialogRegistry = createDialogRegistry();

	export function openDialog(name: string) {
		dialogRegistry.get(name).states.open.set(true);
	}

	export function closeDialog(name: string) {
		dialogRegistry.get(name).states.open.set(false);
	}
</script>

<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { dialogOverlayVariants, dialogVariants } from '.';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onDestroy } from 'svelte';

	export let name: string = generateName();
	export let open = false;
	export let options: CreateDialogProps | undefined = undefined;
	export let overlayClasses: string | undefined = undefined;
	export let dialogClasses: string | undefined = undefined;

	const {
		elements: { portalled, title, content, description, close, overlay },
		states,
	} = dialogRegistry.get(name, options);

	function closeDialog() {
		open = false;
	}

	onDestroy(() => dialogRegistry.remove(name));

	const sync = createSync(states);
	$: sync.open(open, (v) => (open = v));
</script>

{#if open}
	<div class="isolate fixed" use:melt={$portalled}>
		<div
			use:melt={$overlay}
			class={dialogOverlayVariants({ class: overlayClasses })}
			transition:fade={{ duration: 60, easing: quintOut }}
		/>
		<div
			class={dialogVariants({ class: dialogClasses })}
			use:melt={$content}
			transition:fly={{ y: -30, duration: 150, easing: quintOut }}
		>
			<slot
				titleBuilder={$title}
				descriptionBuilder={$description}
				closeBuilder={$close}
				close={closeDialog}
			/>
		</div>
	</div>
{/if}
