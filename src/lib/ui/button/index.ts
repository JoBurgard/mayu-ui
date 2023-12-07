import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
	base: [
		'relative',
		'rounded-[--btn-roundedness]',
		'px-3 py-1.5',
		'text-sm/6 font-semibold',
		'shadow-[inset_0_1px_0_#ffffff1e]',
		'transition-transform ease-out duration-75',
		'active:scale-[0.95]',
		"before:(absolute inset-0 rounded-[--btn-roundedness] mix-blend-multiply ring-1 content-[''] ring-[--btn-ring-color])",
		"after:hover:(absolute inset-0 rounded-[--btn-roundedness] bg-white/5 content-[''])",
	],
	variants: {
		variant: {
			primary: `bg-sky-500 text-white [--btn-ring-color:theme('colors.sky.600')5A]`,
		},
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
