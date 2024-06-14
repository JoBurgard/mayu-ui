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
	variants: {
		unstyled: {
			false: [
				'transition transition-property-[outline-color,border-color]',
				'border border-gray-300 outline-1',
				'shadow-[0px_1px_1px_inset_#0000002f]',
				'focus:border-[--input-focus-border-color]',
				'placeholder:text-gray-600',
			],
			true: 'focus-visible:outline-0',
		},
		size: {
			xs: ``,
			sm: ``,
			base: ``,
			lg: ``,
			xl: ``,
		},
		status: {
			default: [],
			error: `border-red-400 outline-red-500 focus:border-red-500`,
		},
	},
	compoundVariants: [
		{ unstyled: false, size: 'xs', class: `px-2 py-0.5 text-xs/6 rounded-[--roundedness-xs]` },
		{ unstyled: false, size: 'sm', class: `px-3 py-0.75 text-xs/6 rounded-[--roundedness-sm]` },
		{ unstyled: false, size: 'base', class: `px-3 py-1.5 text-sm/6 rounded-[--roundedness-base]` },
		{ unstyled: false, size: 'lg', class: `px-4 py-3 text-lg/6 rounded-[--roundedness-lg]` },
		{ unstyled: false, size: 'xl', class: `px-5 py-5 text-2xl/6 rounded-[--roundedness-lg]` },
	],
	defaultVariants: {
		unstyled: false,
		size: 'base',
		status: 'default',
	},
});
// TODO report unocss bug
// [input[aria-expanded=true]~&] does not work
// [input[aria-expanded=true]_~_&] works
const inputPlaceholderVariants = tv({
	base: [
		'absolute top-1/2 -translate-y-1/2 text-gray-600 select-none',
		'transition-duration-100 transition-ease-out transition-property-[top,font-size,line-height]',
		'[input:not(:placeholder-shown)~&,input:focus~&,input[aria-expanded=true]_~_&]:(text-$color-primary bg-white px-1 -ml-1 rounded top-0)',
		'pointer-events-none',
	],
	variants: {
		size: {
			xs: `text-xs left-2 [input:not(:placeholder-shown)~&,input:focus~&,input[aria-expanded=true]_~_&]:(text-xs/3)`,
			sm: `text-xs left-3 [input:not(:placeholder-shown)~&,input:focus~&,input[aria-expanded=true]_~_&]:(text-xs/3)`,
			base: `text-sm left-3 [input:not(:placeholder-shown)~&,input:focus~&,input[aria-expanded=true]_~_&]:(text-xs/3)`,
			lg: `text-lg left-4 [input:not(:placeholder-shown)~&,input:focus~&,input[aria-expanded=true]_~_&]:(text-sm/4)`,
			xl: `text-2xl left-5 [input:not(:placeholder-shown)~&,input:focus~&,input[aria-expanded=true]_~_&]:(text-base/5)`,
		},
		status: {
			default: [],
			error:
				'text-red-500 [input:not(:placeholder-shown)~&,input:focus~&,input[aria-expanded=true]_~_&]:(text-red-700)',
		},
	},
	defaultVariants: {
		size: 'base',
		status: 'default',
	},
});

type Size = VariantProps<typeof inputVariants>['size'];
type Status = VariantProps<typeof inputVariants>['status'];

type Props = Omit<HTMLInputAttributes, 'size'> & {
	size?: Size;
	status?: Status;
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
