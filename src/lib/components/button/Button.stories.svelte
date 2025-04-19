<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Basics/Button'
	});
</script>

<script lang="ts"></script>

<Story name="Default">
	<button type="button" class="btn">Button text</button>
</Story>
