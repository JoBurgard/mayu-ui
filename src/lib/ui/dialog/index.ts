/**
 * SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
 * SPDX-License-Identifier: Unlicense
 */

import { tv } from 'tailwind-variants';
import Dialog from './Dialog.svelte';

const dialogOverlayVariants = tv({
	base: 'fixed inset-0 bg-black/30',
});

const dialogVariants = tv({
	base: 'fixed left-1/2 top-1/2 max-h-[85vh] w-[90vh] -translate-x-1/2 -translate-y-1/2 border min-h-0 rounded-[--roundedness-base] shadow-lg bg-white overflow-y-auto',
	variants: {
		size: {
			xs: 'p-1.5 text-xs',
			sm: 'p-1.5 text-xs',
			base: 'p-2 text-sm',
			lg: 'p-3 text-lg',
			xl: 'p-5 text-2xl',
		},
	},
	defaultVariants: {
		size: 'base',
	},
});

export { Dialog, dialogOverlayVariants, dialogVariants };
