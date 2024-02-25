/**
 * SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
 * SPDX-License-Identifier: Unlicense
 */

import { tv } from 'tailwind-variants';
import Root from './ContextMenu.svelte';

const contextMenuVariants = tv({
	slots: {
		menu: [
			'grid grid-cols-[auto_auto_1fr_auto]',
			'p-1 border min-h-0 max-w-[500px] max-h-[500px] min-w-[220px] rounded-[--roundedness-base] shadow-lg bg-white',
			'outline-none',
		],
		item: [
			'px-2 py-1 relative select-none rounded-md',
			'z-20 text-gray-900 outline-none',
			'data-[highlighted]:bg-gray-200 data-[highlighted]:text-gray-900',
			'data-[disabled]:text-neutral-300',
			'grid grid-cols-subgrid grid-col-span-4',
		],
		separator: 'm-1 h-[1px] bg-gray-200 ring-0!',
		hotkey: 'pl-4 text-end text-gray-600',
	},
	variants: {
		size: {
			xs: {
				item: `text-xs leading-4`,
				hotkey: 'text-[0.625rem] leading-4',
			},
		},
	},
	defaultVariants: {
		size: 'xs',
	},
});

export { Root as ContextMenu, contextMenuVariants };
