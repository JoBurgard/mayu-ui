/**
 * SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
 * SPDX-License-Identifier: Unlicense
 *
 * Credits / Inspiration
 * https://github.com/huntabyte/shadcn-svelte
 */
import { tv, type VariantProps } from 'tailwind-variants';
import Root from './Input.svelte';
import type { HTMLInputAttributes } from 'svelte/elements';

const inputVariants = tv({
	base: `
		transition transition-property-[outline-color,border-color]
		rounded-[--input-roundedness] border outline-1
		shadow-[0px_1px_1px_inset_#0000002f]
		focus:border-[--input-focus-border-color
	`,
	variants: {
		size: {
			sm: `px-3 py-0.75 text-xs/6 rounded-[--roundedness-sm]`,
			base: `px-3 py-1.5 text-sm/6`,
			lg: `px-4 py-3 text-lg/6 rounded-[--roundedness-lg]`,
			xl: `px-5 py-5 text-2xl/6 rounded-[--roundedness-lg]`,
		},
	},
	defaultVariants: {
		size: 'base',
	},
});
const inputPlaceholderVariants = tv({
	base: `absolute top-1/2 -translate-y-1/2 text-gray-400 transition-duration-100 transition-ease-out transition-property-[top,font-size,line-height] [input:not(:placeholder-shown)~&,input:focus~&]:(text-[--color-primary] bg-white px-1 -ml-1 rounded text-xs top-0)`,
	variants: {
		size: {
			sm: `text-xs/6 left-3`,
			base: `text-sm/6 left-3`,
			lg: `text-lg/6 left-4`,
			xl: `text-2xl/6 left-5`,
		},
	},
	defaultVariants: {
		size: 'base',
	},
});

type Size = VariantProps<typeof inputVariants>['size'];

type Props = Omit<HTMLInputAttributes, 'size'> & {
	size?: Size;
};

type FormInputEvent<T extends Event = Event> = T & {
	currentTarget: EventTarget & HTMLInputElement;
};
type InputEvents = {
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

export {
	inputVariants,
	inputPlaceholderVariants,
	Root as Input,
	type Props as InputProps,
	type InputEvents,
};
