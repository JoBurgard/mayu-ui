/**
 * SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
 * SPDX-License-Identifier: Unlicense
 *
 * Credits / Inspiration
 * https://github.com/huntabyte/shadcn-svelte
 */
import { tv } from 'tailwind-variants';
import Root from './Input.svelte';

const inputVariants = tv({
	base: [
		'rounded-[--input-roundedness]',
		`border outline-1`,
		`shadow-[0px_1px_1px_inset_#0000002f]`,
		`focus:border-[--input-focus-border-color]`,
	],
	variants: {
		size: {
			sm: `px-2 py-0.75 text-xs/6 rounded-[--roundedness-sm]`,
			base: `px-3 py-1.5 text-sm/6`,
			lg: `px-4 py-3 text-lg/6 rounded-[--roundedness-lg]`,
			xl: `px-5 py-5 text-2xl/6 rounded-[--roundedness-lg]`,
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

export { Root as Input, inputVariants };
