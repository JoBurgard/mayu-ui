import { defineConfig, presetWind, transformerDirectives, presetIcons } from 'unocss';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import button from './src/lib/shortcuts/button';
import input from './src/lib/shortcuts/input';

export default defineConfig({
	presets: [presetWind(), presetIcons()],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	content: {
		pipeline: {
			include: [
				/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
				'src/**/*.stories.{js,ts}',
			],
		},
	},
	shortcuts: {
		...button,
		...input,
	},
});
