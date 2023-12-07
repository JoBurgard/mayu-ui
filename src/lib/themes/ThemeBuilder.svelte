<script>
	import Select from '$lib/ui/Select.svelte';
	import Textfield from '$lib/ui/Textfield.svelte';
	import Label from '$lib/ui/Label.svelte';
	import { buttonVariants } from '$lib/ui/button';
</script>

<div class="flex flex-col gap-6">
	<div><button class={buttonVariants()} type="button">Button</button></div>
	<div><Textfield value="" /></div>
	<div>
		<Label text="Fruit">
			<Select options={['Apples', 'Bananas', 'Pineapples']} />
		</Label>
	</div>
</div>
