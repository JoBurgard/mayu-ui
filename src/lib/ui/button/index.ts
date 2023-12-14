/**
 * SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
 * SPDX-License-Identifier: Unlicense
 *
 * ---
 * Credits
 * 3D Button inspired by https://www.joshwcomeau.com/animation/3d-button/
 *
 */

import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
	base: [
		`transition-transform`,
		`[transform-style:preserve-3d]`,
		'relative',
		'rounded-[--btn-roundedness]',
		'px-3 py-1.5 mb-[2px]',
		'text-sm/6 font-semibold',
	],
	variants: {
		variant: {
			primary: `bg-sky-500 text-white [--btn-edge-color-bright:theme('colors.sky.600')] [--btn-edge-color-dark:theme('colors.sky.800')]`,
		},
		size: {
			sm: `px-2 py-0.75 text-xs/6`,
			base: `px-4 py-1.5 text-sm/6`,
			lg: `px-8 py-3 text-lg/6`,
			xl: `px-12 py-5 text-2xl/6`,
		},
		'3d': {
			true: [
				'shadow-[inset_0px_calc(2px*var(--btn-has-highlight))_0px_#ffffff2f]',
				`hover:(-translate-y-1px duration-250 ease-out) hover:before:(translate-y-3px duration-250 ease-out) hover:after:(translate-y-6px duration-250 ease-out)`,
				`before:(transition-transform absolute -translate-z-1px translate-y-2px top-0 left-0 content-[''] rounded-[--btn-roundedness] w-full h-full [background:linear-gradient(to_right,_var(--btn-edge-color-dark)_0%,_var(--btn-edge-color-bright)_9%,_var(--btn-edge-color-bright)_91%,_var(--btn-edge-color-dark)_100%)] from-[--btn-edge-color-dark] from-15% via-[--btn-edge-color-bright] to-[--btn-edge-color-dark] to-85%)`,
				`after:(transition-transform absolute -translate-z-2px translate-y-4px top-0 left-0 content-[''] rounded-[--btn-roundedness] w-full h-full bg-[#0000004f] filter-blur-1px)`,
				'active:(shadow-[inset_0px_calc(2px*var(--btn-has-highlight))_0px_#ffffff0a] duration-34 translate-y-1px)',
				'active:before:(translate-y-1px duration-34)',
				'active:after:(translate-y-2px duration-34)',
			],
			false: [
				`hover:(-translate-y-1px duration-250 ease-out) hover:after:(translate-y-2px duration-250 ease-out)`,
				`after:(transition-transform absolute -translate-z-2px translate-y-1px top-0 left-0 content-[''] rounded-[--btn-roundedness] w-full h-full bg-[#0000004f] filter-blur-[calc(1px*var(--btn-has-shadow))])`,
				'active:(shadow-[inset_0px_calc(2px*var(--btn-has-highlight))_0px_#ffffff00] duration-34 translate-y-1px)',
				'active:after:(translate-y-0px duration-34)',
			],
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'base',
		'3d': false,
	},
});

type Variant = VariantProps<typeof buttonVariants>['variant'];
type Size = VariantProps<typeof buttonVariants>['size'];

interface AnchorElement extends HTMLAnchorAttributes {
	href?: HTMLAnchorAttributes['href'];
	type?: never;
}

interface ButtonElement extends HTMLButtonAttributes {
	type?: HTMLButtonAttributes['type'];
	href?: never;
}

type Props =
	| AnchorElement
	| (ButtonElement & {
			variant?: Variant;
			size?: Size;
	  });

type ButtonEventHandler<T extends Event = Event> = T & {
	currentTarget: EventTarget & HTMLButtonElement;
};

type Events = {
	click: ButtonEventHandler<MouseEvent>;
	keydown: ButtonEventHandler<KeyboardEvent>;
	change: ButtonEventHandler<Event>;
	keyup: ButtonEventHandler<KeyboardEvent>;
	mouseenter: ButtonEventHandler<MouseEvent>;
	mouseleave: ButtonEventHandler<MouseEvent>;
};

export {
	buttonVariants,
	type Events as ButtonEvents,
	type Props as ButtonProps,
	type Events,
	type Props,
};
