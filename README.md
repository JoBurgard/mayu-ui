# 🦋 Mayu UI

An extensively themable component library for Svelte. 

> [!WARNING]
> This project is still work in progress and not production ready. Breaking changes may appear with any release.

We want to deliver a great component library that can be simply styled by an extensive theming system.
Creating your own theme will be very simple with the provided Themebuilder.

It's built on top of [Melt-UI](https://melt-ui.com/), the great headless-ui library for Svelte.

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

```css
# example file

:root {
  /* colors */
  --color-primary: #0284c7;
  --color-secondary: theme('colors.sky.500');
  --color-neutral: theme('colors.gray.200');
  --color-text-on-primary: white;
  --color-text-on-secondary: white;
  --color-text-on-neutral: theme('colors.gray.800');

  /* roundedness / border-radius */
  --roundedness-base: 0.5rem;
  --roundedness-lg: 0.75rem;
  --roundedness-sm: 0.4rem;
  --roundedness-xs: 0.3rem;

  /* button */
  --btn-roundedness: var(--roundedness-base);
  --btn-has-shadow: 1;
  --btn-has-highlight: 1;
  --btn-color-text-on-primary: var(--color-text-on-primary);
  --btn-color-text-on-secondary: var(--color-text-on-secondary);
  --btn-color-text-on-neutral: var(--color-text-on-neutral);

  /* input */
  --input-roundedness: var(--roundedness-base);
  --input-focus-border-color: var(--color-primary);
}

* {
  outline-color: transparent;
}

*:focus-visible {
  outline: 2px solid var(--color-primary);
}

mark {
  border-radius: var(--roundedness-xs);
  background-color: color-mix(in oklch, var(--color-primary) 25%, transparent);
}
```

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
