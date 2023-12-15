/**
 * SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
 * SPDX-License-Identifier: Unlicense
 *
 * Credits / Inspiration
 * https://github.com/huntabyte/shadcn-svelte
 */
import { tv, type VariantProps } from 'tailwind-variants';
import Root from './Input.svelte';

const inputVariants = tv({
	base: [
		'rounded-[--input-roundedness]',
		`border`,
		`shadow-[0px_1px_1px_inset_#0000002f] outline-1 outline-offset-2`,
	],
	variants: {
		size: {
			sm: `px-2 py-0.75 text-xs/6`,
			base: `px-4 py-1.5 text-sm/6`,
			lg: `px-8 py-3 text-lg/6`,
			xl: `px-12 py-5 text-2xl/6`,
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'base',
	},
});

type FormInputEvent<T extends Event = Event> = T & {
	currentTarget: EventTarget & HTMLInputElement;
};
export type InputEvents = {
	blur: FormInputEvent<FocusEvent>;
	change: FormInputEvent<Event>;
	click: FormInputEvent<MouseEvent>;
	focus: FormInputEvent<FocusEvent>;
	keydown: FormInputEvent<KeyboardEvent>;
	keypress: FormInputEvent<KeyboardEvent>;
	keyup: FormInputEvent<KeyboardEvent>;
	mouseover: FormInputEvent<MouseEvent>;
	mouseenter: FormInputEvent<MouseEvent>;
	mouseleave: FormInputEvent<MouseEvent>;
	paste: FormInputEvent<ClipboardEvent>;
	input: FormInputEvent<InputEvent>;
};

export { inputVariants, Root as Input };
