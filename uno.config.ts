import { defineConfig, presetAttributify, presetWind, transformerDirectives } from 'unocss';
import transformerVariantGroup from '@unocss/transformer-variant-group';

export default defineConfig({
	presets: [presetAttributify(), presetWind()],
	transformers: [transformerVariantGroup(), transformerDirectives()],
	content: {
		pipeline: {
			include: [
				/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
				'src/**/*.stories.{js,ts}',
			],
		},
	},
	shortcuts: {
		btn: `
			relative
			rounded-[--btn-roundedness]
			px-3 py-1.5
			text-sm/6 font-semibold
			shadow-[inset_0_1px_0_#ffffff1e]
			transition-transform ease-out duration-75
			active:scale-90
			before:(absolute inset-0 rounded-[--btn-roundedness] mix-blend-multiply ring-1 content-[''] ring-[--btn-ring-color])
			after:hover:(absolute inset-0 rounded-[--btn-roundedness] bg-white/5 content-[''])
		`,
		'btn-primary': `bg-sky-500 text-white [--btn-ring-color:theme('colors.sky.600')5A]`,
		input: `
			relative
			bg-gray-100
			rounded-[--input-roundedness]
			p-1
			shadow-[inset_1px_1px_2px_theme('colors.gray.300')]
			focus:bg-white
		`,
		'input-container': `[&>input]:w-full inset-0 rounded-[--input-roundedness] mix-blend-multiply ring-1 ring-gray-300/50`,
	},
});
