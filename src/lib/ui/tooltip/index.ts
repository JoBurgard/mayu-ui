/**
 * SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
 * SPDX-License-Identifier: Unlicense
 */

import { tv } from 'tailwind-variants';
import Root from './Tooltip.svelte';

const tooltipVariants = tv({
	base: 'border min-h-0 max-h-[500px] rounded-[--roundedness-base] shadow-lg bg-white overflow-y-auto',
	variants: {
		size: {
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

export { Root as Tooltip, tooltipVariants };
