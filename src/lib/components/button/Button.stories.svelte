<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Basics/Button'
	});
</script>

<script lang="ts"></script>

<Story name="Default">
	<button type="button" class="btn btn-xxs">Button text</button>
	<button type="button" class="btn btn-xs">Button text</button>
	<button type="button" class="btn btn-sm">Button text</button>
	<button type="button" class="btn">Button text</button>
</Story>
