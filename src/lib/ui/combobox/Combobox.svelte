<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->

<script lang="ts" generics="D, V">
	import { tooltipVariants } from '../tooltip';

	import uFuzzy from '@leeoniya/ufuzzy';
	import { createCombobox, melt, type ComboboxOptionProps } from '@melt-ui/svelte';
	import { beforeUpdate, createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import {
		inputPlaceholderVariants,
		inputVariants,
		type InputEvents,
		type InputProps,
	} from '../input';

	type $$Props = Omit<InputProps, 'value'> & {
		data: D[];
		value: V | undefined;
		arbitraryValue?: boolean;
		createHaystack?: (item: D) => string;
		dataToOption?: (item: D) => ComboboxOptionProps<V> & { [x: string]: any };
		valueToData?: (value: V) => D;
		optionToDisplayText?: (
			option: (ComboboxOptionProps<V> & { [x: string]: any }) | undefined,
		) => string;
	};
	type $$Events = InputEvents & {
		select: CustomEvent<{
			value: V | undefined;
			option: (ComboboxOptionProps<V> & { [x: string]: any }) | undefined;
		}>;
	};

	export let data: $$Props['data'];
	let className: $$Props['class'] = undefined;
	export { className as class };
	export let value: $$Props['value'] = undefined;
	export let placeholder: $$Props['placeholder'] = undefined;
	export let size: $$Props['size'] = undefined;
	export let arbitraryValue: $$Props['arbitraryValue'] = false;
	export let createHaystack: Required<$$Props>['createHaystack'] = (it) => it as string;
	export let dataToOption: Required<$$Props>['dataToOption'] = (item) => {
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
	export let valueToData: Required<$$Props>['valueToData'] = (value) => value as unknown as D;
	export let optionToDisplayText: Required<$$Props>['optionToDisplayText'] = (option) =>
		option?.label || '';

	let options: ComboboxOptionProps<V>[] = data.map((it) => dataToOption(it));
	let valueInternal: $$Props['value'];
	let lastAction: 'input' | 'select' | undefined = undefined;

	const dispatch = createEventDispatcher<{
		select: $$Events['select']['detail'];
	}>();

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected },
	} = createCombobox<V>({
		forceVisible: true,
		positioning: {
			placement: 'bottom-start',
			sameWidth: false,
		},
		onOpenChange: ({ next }) => {
			if (next === false) {
				updateInputValue();
			}
			return next;
		},
	});

	// initially set the value of the input field
	// otherwise it would be empty if value is just a string
	if (typeof value === 'string') {
		$inputValue = value;
	}

	function checkIfUpdateFromOutside() {
		if (value !== valueInternal) {
			if (value === undefined) {
				clearValueAndInput();
				return;
			}
			const foundOption = options.find((option) => option.value === value);
			if (foundOption === undefined && ((arbitraryValue && value !== undefined) || value === '')) {
				$selected = dataToOption(valueToData(value));
				$inputValue = optionToDisplayText($selected);
				valueInternal = value;
			} else if (foundOption !== undefined) {
				$selected = foundOption;
				$inputValue = optionToDisplayText($selected);
				valueInternal = value;
			} else {
				value = valueInternal;
			}
		}
	}

	// detect changes from the outside and try to match the option
	beforeUpdate(() => {
		checkIfUpdateFromOutside();
	});

	// run on SSR
	checkIfUpdateFromOutside();

	let haystack: string[] = data.map(createHaystack);

	selected.subscribe((option) => {
		if (option === undefined && lastAction === undefined) {
			return;
		}
		value = option?.value;
		valueInternal = value;
		dispatch('select', { value, option: options?.find((option) => option.value === value) });
	});

	const fuzzySearch = new uFuzzy({ intraMode: 1 });
	const showAllResult = data.map((_, index) => index);

	function handleInput(event: InputEvents['input']) {
		lastAction = 'input';
	}

	function clearValueAndInput(value: undefined | '' = undefined) {
		$inputValue = '';
		$selected = undefined;
	}

	function updateInputValue() {
		if (lastAction === 'input' && $inputValue === '') {
			clearValueAndInput();
		} else if (lastAction === 'input' && arbitraryValue) {
			$selected = dataToOption(valueToData($inputValue as V));
			valueInternal = $inputValue as V;
			value = $inputValue as V;
		} else if (lastAction === 'select' || !arbitraryValue) {
			$inputValue = optionToDisplayText($selected);
		}
	}

	$: filteredOptions =
		$touchedInput && $inputValue !== ''
			? fuzzySearch.filter(haystack as string[], $inputValue)
			: showAllResult;

	$: options = data.map((it) => dataToOption(it));
	$: haystack = data.map(createHaystack);
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
				class="p-1 absolute right-6 top-1/2 z-10 -translate-y-1/2 hover:text-[--color-primary] transition-transform duration-34 select-none hover:-translate-y-[calc(50%+1px)] active:-translate-y-[calc(50%-1px)]"
				on:click={() => clearValueAndInput()}><div class="i-lucide-x-circle" /></button
			>
		{/if}
		<div class="i-lucide-chevrons-up-down absolute right-2 top-1/2 z-10 -translate-y-1/2" />
	</label>
	{#if $open}
		<ul
			class={tooltipVariants({ size })}
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
						on:m-click={(event) => {
							lastAction = 'select';
						}}
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
