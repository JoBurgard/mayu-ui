/**
 * SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
 * SPDX-License-Identifier: Unlicense
 *
 * Credits / Inspiration
 * https://github.com/huntabyte/shadcn-svelte
 * https://melt-ui.com/docs/builders/combobox
 */

import { tv } from 'tailwind-variants';
import Combobox, { i18n } from './Combobox.svelte';
import { inputVariants } from '../input';

const comboboxInputVariants = tv({
	extend: inputVariants,
	base: 'placeholder-transparent w-full',
	compoundVariants: [
		{ unstyled: false, size: 'xs', class: `pr-9.5` },
		{ unstyled: false, size: 'sm', class: `pr-13` },
		{ unstyled: false, size: 'base', class: `pr-13` },
		{ unstyled: false, size: 'lg', class: `pr-17` },
		{ unstyled: false, size: 'xl', class: `pr-21.5` },
	],
});

const comboboxClearButtonVariants = tv({
	base: [
		'absolute p-1 top-1/2 z-10 -translate-y-1/2',
		'transition-transform duration-34 select-none',
		'hover:text-[--color-primary] hover:-translate-y-[calc(50%+1px)]',
		'active:-translate-y-[calc(50%-1px)]',
	],
	variants: {
		size: {
			xs: 'right-4 text-xs',
			sm: 'right-6',
			base: 'right-6',
			lg: 'right-8.5 text-lg',
			xl: 'right-12.5 text-xl',
		},
	},
	defaultVariants: {
		size: 'base',
	},
});

const comboboxChevronVariants = tv({
	base: ['i-lucide-chevrons-up-down absolute top-1/2 z-10 -translate-y-1/2'],
	variants: {
		size: {
			xs: 'right-1 size-3',
			sm: 'right-2',
			base: 'right-2',
			lg: 'right-3 size-5',
			xl: 'right-4.5 size-6',
		},
	},
	defaultVariants: {
		size: 'base',
	},
});

export {
	Combobox,
	i18n as i18nCombobox,
	comboboxInputVariants,
	comboboxClearButtonVariants,
	comboboxChevronVariants,
};
