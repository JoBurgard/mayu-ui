<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Meta title="Components/Button" />

<Template let:args>
	<button type="button" class="btn btn-primary">Text</button>
</Template>

<Story name="Primary"></Story>
<Story name="Sizes">
	<button type="button" class="btn btn-sm btn-primary">Text</button>
	<button type="button" class="btn btn-base btn-primary">Text</button>
	<button type="button" class="btn btn-lg btn-primary">Text</button>
	<button type="button" class="btn btn-xl btn-primary">Text</button>
</Story>
