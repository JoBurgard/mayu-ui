import type { UserShortcuts } from 'unocss';

export const button = [
	[
		'btn',
		`
      rounded-$maui-btn-roundness
      bg-$maui-btn-default-bg text-$maui-btn-default-fg
      px-2 py-1
      leading-none
      hover:(bg-$maui-btn-default-bg-hover)
    `,
		{ layer: 'utilities' },
	],
	['btn-xs', `px-0.5 py-0.25`, { layer: 'utilities' }],
] satisfies UserShortcuts;
