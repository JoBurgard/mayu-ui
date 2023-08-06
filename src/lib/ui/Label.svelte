<script lang="ts">
	export let text: string;
</script>

<label class="inline-flex flex-col">
	<span class="font-semibold text-sm text-gray-600 tracking-wide">{text}</span>
	<slot />
</label>
