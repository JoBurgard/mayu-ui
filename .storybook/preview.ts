/**
 * SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
 * SPDX-License-Identifier: Unlicense
 */

import type { Preview } from '@storybook/svelte';

import '@unocss/reset/tailwind.css';
import '../src/theme.css';
import 'virtual:uno.css';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	tags: ['autodocs'],
};

export default preview;
