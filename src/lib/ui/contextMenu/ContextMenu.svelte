<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts">
	import { createContextMenu, melt } from '@melt-ui/svelte';
	import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';
	import { get, type Writable } from 'svelte/store';
	import { contextMenuVariants } from '.';

	type BaseItem = {
		icon?: string;
		text: string;
		hotkey?: string[];
	};

	type ActionItem = {
		type: 'action';
		oninput: () => void;
	};

	type CheckboxItem = {
		type: 'checkbox';
		value: Writable<boolean>;
		onCheckedChange?: ChangeFn<boolean | 'indeterminate'>;
	};

	type RadioGroupItem = {
		type: 'radioGroup';
		value: Writable<unknown>;
		defaultValue: unknown;
		onValueChange?: ChangeFn<unknown>;
	};

	type IncomingItem =
		| (BaseItem & ActionItem)
		| (BaseItem & CheckboxItem)
		| (BaseItem & RadioGroupItem);

	const {
		elements: { trigger: meltTrigger, menu, item, separator },
		states: { open },
		builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
	} = createContextMenu({
		loop: true,
	});

	export let items: IncomingItem[];
	export const trigger = meltTrigger;

	$: menuItems = items.map((it) => {
		switch (it.type) {
			case 'action': {
				return { ...it, item };
			}
			case 'checkbox': {
				const {
					elements: { checkboxItem },
				} = createCheckboxItem({
					checked: it.value,
				});
				return { ...it, checkboxItem };
			}
			case 'radioGroup': {
				return it;
			}
		}
	});

	const {
		menu: menuClasses,
		item: itemClasses,
		separator: separatorClasses,
		hotkey: hotkeyClasses,
	} = contextMenuVariants();
</script>

<slot trigger={$meltTrigger} />

{#if $open}
	<div class={menuClasses()} use:melt={$menu}>
		{#each menuItems as menuItem}
			{#if menuItem.type === 'action'}
				<div
					class={itemClasses()}
					use:melt={get(menuItem.item)}
					on:m-click={() => menuItem.oninput()}
				>
					<div><!-- aligning grid --></div>
					<div>
						{#if menuItem.icon}
							<div class="{menuItem.icon} size-4" />
						{/if}
					</div>
					<div>{menuItem.text}</div>
					<div>
						{#if menuItem.hotkey}
							<div class={hotkeyClasses()}>
								{menuItem.hotkey.join('+')}
							</div>
						{/if}
					</div>
				</div>
			{:else if menuItem.type === 'checkbox'}
				<div class={itemClasses()} use:melt={get(menuItem.checkboxItem)}>
					<div class="flex justify-center pr-4">
						<input tabindex="-1" type="checkbox" checked={get(menuItem.value)} />
					</div>
					<div>
						{#if menuItem.icon}
							<div class="{menuItem.icon} size-4" />
						{/if}
					</div>
					<div>{menuItem.text}</div>
					<div>
						{#if menuItem.hotkey}
							<div class={hotkeyClasses()}>
								{menuItem.hotkey.join('+')}
							</div>
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>
{/if}
