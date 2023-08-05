<script>
	import Select from '$lib/ui/Select.svelte';
	import Textfield from '$lib/ui/Textfield.svelte';
</script>

<div class="flex flex-col gap-6">
	<div><button class="btn btn-primary" type="button">Button</button></div>
	<div><Textfield value="" /></div>
	<div><Select options={['Apples', 'Bananas', 'Pineapples']} /></div>
</div>
