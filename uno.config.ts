import {
	defineConfig,
	presetIcons,
	presetWind4,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';
import { presetMayuUi } from './src/lib/unocss/preset';

export default defineConfig({
	presets: [presetWind4(), presetIcons(), presetMayuUi()],
	transformers: [transformerDirectives(), transformerVariantGroup()],
});
