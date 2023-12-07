import transformerVariantGroup from '@unocss/transformer-variant-group';
import { defineConfig, presetIcons, presetWind, transformerDirectives } from 'unocss';

export default defineConfig({
	presets: [presetWind(), presetIcons()],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	content: {
		pipeline: {
			include: [
				/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
				'src/**/*.{js,ts}',
				'src/**/*.stories.{js,ts}',
			],
		},
	},
});
