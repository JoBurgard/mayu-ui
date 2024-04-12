import {
	defineConfig,
	presetIcons,
	presetTypography,
	presetWind,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';

export default defineConfig({
	presets: [presetWind(), presetIcons(), presetTypography()],
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
