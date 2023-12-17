# Mayu UI

We want to deliver a great component library that can be simply styled by an extensive themeing system.
Creating your own theme will be very simple with the provided Themebuilder.

It will be built on top of Melt-UI, the great headless-ui library for Svelte.

## How to use it

### 1. Modify your uno.config.ts

```ts
export default defineConfig({
	presets: [presetWind(), presetIcons()],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	content: {
		pipeline: {
			include: [
				// ...
				// add this line
				'node_modules/mayu-ui/dist/**/*.{svelte,js}',
			],
		},
		// if you use unocss classes in your app.html
		filesystem: ['src/app.html'],
	},
});
```

### 2. Create a theme.css file

```
├── src
│   ├── app.d.ts
│   ├── app.html
│   └── theme.css <--- this
```

Fill it with your theme from the Themebuilder.

### 3. Import the needed css files

```svelte
<!-- src/routes/+layout.svelte -->
<script>
	import '@unocss/reset/tailwind.css';
	import '../theme.css';
	import 'virtual:uno.css';
</script>
```

### 4. Use the components

```svelte
<script>
	import { buttonVariants, Input } from 'mayu-ui';
</script>

<Input type="text" />
<button class={buttonVariants()}>Click me</button>
```

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

Please see the `LICENSE`-File for the full license text.

For more information, please refer to <http://unlicense.org/>
