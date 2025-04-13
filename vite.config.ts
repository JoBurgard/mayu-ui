import { sveltekit } from '@sveltejs/kit/vite';
import extractorSvelte from '@unocss/extractor-svelte';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
	plugins: [
		UnoCSS({
			extractors: [extractorSvelte()],
			configDeps: getAllConfigFiles(`./src/lib/unocss`),
		}),
		sveltekit(),
	],
});

function getAllConfigFiles(dir: string) {
	const files = fs.readdirSync(dir, { recursive: true });
	return files
		.filter((file) => ['.ts', '.css'].includes(path.extname(String(file))))
		.map((file) => path.join(dir, String(file)));
}
