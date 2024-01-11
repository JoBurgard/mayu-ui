<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts" generics="T">
	import { beforeUpdate, createEventDispatcher } from 'svelte';
	import uFuzzy from '@leeoniya/ufuzzy';
	import {
		createCombobox,
		melt,
		type ComboboxOptionProps,
		type ComboboxOption,
	} from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import {
		inputPlaceholderVariants,
		inputVariants,
		type InputEvents,
		type InputProps,
	} from '../input';

	type $$Props = Omit<InputProps, 'value'> & {
		data: T[];
		value: T | undefined;
		arbitraryValue?: boolean;
		createHaystack?: (item: T) => string;
		toOption?: (item: T) => ComboboxOptionProps<T>;
	};
	type $$Events = InputEvents & {
		select: CustomEvent<ComboboxOption<T> | undefined>;
	};

	export let data: $$Props['data'];
	let className: $$Props['class'] = undefined;
	export { className as class };
	export let value: $$Props['value'] = undefined;
	export let placeholder: $$Props['placeholder'] = undefined;
	export let size: $$Props['size'] = undefined;
	export let arbitraryValue: $$Props['arbitraryValue'] = false;
	export let createHaystack: $$Props['createHaystack'] = undefined;

	let options: ComboboxOptionProps<T>[];
	let valueInternal: $$Props['value'] = value;
	let lastAction: 'input' | 'select' | undefined = undefined;

	const dispatch = createEventDispatcher<{
		select: $$Events['select']['detail'];
	}>();

	// detect changes from the outside and try to match the option
	beforeUpdate(() => {
		if (value !== valueInternal) {
			const foundOption = options.find((option) => option.value === value);
			if (foundOption === undefined && arbitraryValue && value !== undefined) {
				$selected = toOption(value);
				$inputValue = $selected?.label ?? '';
				valueInternal = value;
			} else if (foundOption !== undefined) {
				$selected = foundOption;
				$inputValue = $selected?.label ?? '';
				valueInternal = value;
			} else {
				value = valueInternal;
			}
		}
	});

	let haystack: T[] | string[] = data;

	if (createHaystack) {
		haystack = data.map(createHaystack);
	}

	export let toOption: Required<$$Props>['toOption'] = (item: T): ComboboxOptionProps<T> => {
		if (!(item && typeof item === 'object' && Object.keys(item).length)) {
			throw new Error(
				'If data is not of type {label;value;disabled?} then you have to provide your own toOption function.',
			);
		}
		return {
			// @ts-ignore
			label: item?.label,
			// @ts-ignore
			value: item?.value,
			// @ts-ignore
			disabled: item?.disabled,
		};
	};

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected },
	} = createCombobox<T>({
		forceVisible: true,
		positioning: {
			placement: 'bottom-start',
			sameWidth: false,
		},
	});

	selected.subscribe((option) => {
		value = option?.value;
		valueInternal = value;
		dispatch('select', option);
	});

	const fuzzySearch = new uFuzzy({ intraMode: 1 });
	const showAllResult = data.map((_, index) => index);

	function clearValueIfEmpty(currentInputValue: string) {
		if (currentInputValue === '') {
			value = undefined;
			$selected = undefined;
		}
	}

	function handleInput(event: InputEvents['input']) {
		clearValueIfEmpty(event.currentTarget.value);
		lastAction = 'input';
	}

	function clearValueAndInput() {
		value = undefined;
		$inputValue = '';
		$selected = undefined;
	}

	function updateInputValue(open: boolean) {
		if (!open) {
			if (arbitraryValue && lastAction === 'input') {
				valueInternal = $inputValue as T;
				value = $inputValue as T;
			} else {
				$inputValue = $selected?.label ?? '';
			}
		}
	}

	$: updateInputValue($open);

	$: filteredOptions =
		$touchedInput && $inputValue !== ''
			? fuzzySearch.filter(haystack as string[], $inputValue)
			: showAllResult;

	$: options = data.map((it) => toOption(it));
</script>

<div class="isolate">
	<label class="relative block" use:melt={$label}>
		<input
			use:melt={$input}
			class={inputVariants({
				size,
				class: ['placeholder-transparent w-full pr-13', className],
			})}
			on:blur
			on:change
			on:click
			on:focus
			on:keydown
			on:keypress
			on:keyup
			on:mouseover
			on:mouseenter
			on:mouseleave
			on:paste
			on:input={handleInput}
			on:input
			{placeholder}
			{...$$restProps}
		/>
		{#if placeholder}<span class={inputPlaceholderVariants({ size })}>{placeholder}</span>{/if}
		{#if $inputValue !== ''}
			<button
				type="button"
				class="p-1 absolute right-6 top-1/2 z-10 -translate-y-1/2 hover:text-$color-primary"
				on:click={clearValueAndInput}><div class="i-lucide-x-circle" /></button
			>
		{/if}
		<div class="i-lucide-chevrons-up-down absolute right-2 top-1/2 z-10 -translate-y-1/2" />
	</label>
	{#if $open}
		<ul
			class="p-2 border min-h-0 max-h-[500px] rounded-[--roundedness-base] shadow-lg bg-white overflow-y-auto"
			use:melt={$menu}
			transition:fly={{ duration: 150, y: -5 }}
		>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div class="flex min-h-0 flex-col gap-0 overflow-y-scroll" tabindex="0">
				{#each filteredOptions || [] as resultIndex, index (index)}
					{@const optionData = options[resultIndex]}
					<li
						class="px-3 py-1.5 scroll-my-2 cursor-pointer rounded-[--roundedness-sm] hover:(bg-gray-100) data-[highlighted]:bg-gray-200 select-none"
						use:melt={$option(optionData)}
						on:m-click={() => (lastAction = 'select')}
					>
						<div class="break-words">{optionData.label}</div>
					</li>
				{:else}
					<li class="px-3 py-1.5 rounded-[--roundedness-sm] select-none">
						No matching entry found.
					</li>
				{/each}
			</div>
		</ul>
	{/if}
</div>
