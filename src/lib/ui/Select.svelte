<script lang="ts" generics="T">
	export let options: Array<T> = [];
	export let required: boolean | undefined = undefined;

	export let getValue = (option: T): any => option;
	export let getText = (option: T): string => String(option);
</script>

<!-- TODO forward events -->
<select {required} {...$$restProps}>
	{#each options as option}
		{@const value = getValue(option)}
		{@const text = getText(option)}
		<option {value}>{text}</option>
	{/each}
</select>
