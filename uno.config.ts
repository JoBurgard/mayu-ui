import { defineConfig, presetAttributify, presetWind } from 'unocss';
import transformerVariantGroup from '@unocss/transformer-variant-group';

export default defineConfig({
	presets: [presetAttributify(), presetWind()],
	transformers: [transformerVariantGroup()],
	content: {
		pipeline: {
			include: [
				/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
				'src/**/*.stories.{js,ts}',
			],
		},
	},
	shortcuts: {
		btn: 'px-4 py-2 rounded-[--btn-roundedness]',
		'variant-filled-primary': 'bg-blue-500 text-white',
	},
});
