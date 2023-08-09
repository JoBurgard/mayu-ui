import {
	defineConfig,
	presetAttributify,
	presetWind,
	transformerDirectives,
	presetIcons,
} from 'unocss';
import transformerVariantGroup from '@unocss/transformer-variant-group';

export default defineConfig({
	presets: [presetAttributify(), presetWind(), presetIcons()],
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
		'btn-sm': `px-2 py-0.75 text-xs/6`,
		'btn-base': `px-4 py-1.5 text-sm/6`,
		'btn-lg': `px-8 py-3 text-lg/6`,
		'btn-xl': `px-12 py-5 text-2xl/6`,
		'btn-primary': `bg-sky-500 text-white [--btn-ring-color:theme('colors.sky.600')5A]`,
		input: `
			relative
			bg-gray-100
			rounded-[--input-roundedness]
			px-3 py-1.5
			shadow-[inset_1px_1px_2px_theme('colors.gray.300')]
			focus:bg-white
			hover:bg-gray-50
		`,
		'input-container': `[&>input]:w-full relative inline-flex rounded-[--input-roundedness] mix-blend-multiply ring-1 ring-gray-400/50`,
	},
});
