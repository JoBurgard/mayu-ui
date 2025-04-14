import { definePreset, symbols, type CSSObjectInput, type CSSValueInput } from 'unocss';
import { button } from './button';
import fs from 'node:fs';

const propertiesCss = fs.readFileSync(import.meta.dirname + '/preflights/properties.css', 'utf8');

export const presetMayuUi = definePreset((options?: Record<string, unknown>) => {
	return {
		name: 'mayu-ui',
		preflights: [
			{
				getCSS: () => propertiesCss,
			},
		],
		shortcuts: [...button],
	};
});

function defineProperty(
	name: string,
	settings: { syntax: string; inherits?: boolean; initialValue: string },
): CSSValueInput {
	return {
		[symbols.shortcutsNoMerge]: true,
		[symbols.noMerge]: true,
		[symbols.variants]: () => [
			{
				parent: '',
				layer: 'cssvar-property',
				selector: () => `@property ${name}`,
			},
		],
		syntax: settings.syntax,
		inherits: String(settings.inherits ?? false),
		'initial-value': settings.initialValue,
	} satisfies CSSObjectInput;
}
