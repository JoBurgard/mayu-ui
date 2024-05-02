<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->
<script lang="ts" context="module">
	export const i18n = {
		noSearchResult: 'No matching entry found.',
	};
</script>

<script lang="ts" generics="D, V">
	import { comboboxChevronVariants, comboboxClearButtonVariants, comboboxInputVariants } from '.';

	import uFuzzy from '@leeoniya/ufuzzy';
	import { createCombobox, melt, type ComboboxOptionProps } from '@melt-ui/svelte';
	import { beforeUpdate, createEventDispatcher } from 'svelte';
	import type { Action } from 'svelte/action';
	import { fly } from 'svelte/transition';
	import {
		inputPlaceholderVariants,
		inputVariants,
		type InputEvents,
		type InputProps,
	} from '../input';
	import { tooltipVariants } from '../tooltip';

	type $$Props = Omit<InputProps, 'value'> & {
		data: D[];
		value: V | undefined;
		arbitraryValue?: boolean;
		isLoading?: boolean;
		unstyled?: boolean;
		menuClasses?: string;
		createHaystack?: (item: D) => string;
		dataToOption?: (item: D) => ComboboxOptionProps<V> & Record<string, any>;
		valueToData?: (value: V) => D;
		optionToDisplayText?: (
			option: (ComboboxOptionProps<V> & Record<string, any>) | undefined,
		) => string;
	};
	type $$Events = InputEvents & {
		select: CustomEvent<{
			value: V | undefined;
			option: (ComboboxOptionProps<V> & Record<string, any>) | undefined;
		}>;
	};

	export let data: $$Props['data'];
	let className: $$Props['class'] = undefined;
	export { className as class };
	export let value: $$Props['value'] = undefined;
	export let placeholder: $$Props['placeholder'] = undefined;
	export let size: $$Props['size'] = undefined;
	export let menuClasses: $$Props['menuClasses'] = undefined;
	export let arbitraryValue: $$Props['arbitraryValue'] = false;
	export let isLoading: $$Props['isLoading'] = false;
	export let unstyled: $$Props['unstyled'] = false;
	export let createHaystack: Required<$$Props>['createHaystack'] = (it) => it as string;
	export let dataToOption: Required<$$Props>['dataToOption'] = (item) => {
		if (!(item && typeof item === 'object' && Object.keys(item).length)) {
			throw new Error(
				'If data is not of type {label;value;disabled?} then you have to provide your own toOption function.',
			);
		}
		return {
			// @ts-expect-error workaround
			label: item?.label,
			// @ts-expect-error workaround
			value: item?.value,
			// @ts-expect-error workaround
			disabled: item?.disabled,
		};
	};
	export let valueToData: Required<$$Props>['valueToData'] = (value) => value as unknown as D;
	export let optionToDisplayText: Required<$$Props>['optionToDisplayText'] = (option) =>
		option?.label || '';

	let options: ComboboxOptionProps<V>[] = data.map((it) => dataToOption(it));
	let valueInternal: $$Props['value'];
	let lastAction: 'input' | 'select' | null = null;
	let skipProcessingOnClose = false;

	const dispatch = createEventDispatcher<{
		select: $$Events['select']['detail'];
	}>();

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected, highlightedItem },
	} = createCombobox<V>({
		forceVisible: true,
		positioning: {
			placement: 'bottom-start',
			sameWidth: false,
		},
		onOpenChange: ({ next }) => {
			if (next === false && skipProcessingOnClose === false) {
				processInputValue();
			}
			if (next === true) {
				skipProcessingOnClose = false;
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

	selected.subscribe((option) => {
		if (option === undefined && lastAction === undefined) {
			return;
		}
		value = option?.value;
		valueInternal = value;
		dispatch('select', { value, option: options?.find((option) => option.value === value) });
	});

	const fuzzySearch = new uFuzzy({ intraMode: 1 });
	let haystack: string[] = data.map(createHaystack);
	let showAllResult = data.map((_, index) => index);

	function handleInput() {
		lastAction = 'input';
		$highlightedItem = null;
		// TODO highlight if exact match
	}

	const handleEnterKey = (event: InputEvents['keyup']) => {
		if (event.key !== 'Enter') {
			return;
		}

		processInputValue();
	};

	function clearValueAndInput() {
		$inputValue = '';
		$selected = undefined;
	}

	function processInputValue() {
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
	$: showAllResult = data.map((_, index) => index);

	const minSameWidth: Action<HTMLUListElement> = (element) => {
		const inputElement = document.getElementById($input.id);
		element.style.minWidth = `${inputElement?.getBoundingClientRect().width}px`;
	};
</script>

<div class="isolate flex h-full">
	<label class="relative grow flex flex-col" use:melt={$label}>
		<input
			use:melt={$input}
			class={comboboxInputVariants({
				size,
				unstyled,
				class: className,
			})}
			on:blur
			on:change
			on:click
			on:focus
			on:keydown
			on:keydown={handleEnterKey}
			on:keypress
			on:keyup
			on:mouseover
			on:mouseenter
			on:mouseleave
			on:paste
			on:input={handleInput}
			on:input
			on:m-keydown={(e) => {
				// Prevent selecting value when closing by escape
				if (e.detail.originalEvent.key === 'Escape') {
					skipProcessingOnClose = true;
				}
				if (e.detail.originalEvent.key === 'Enter' && $highlightedItem) {
					lastAction = 'select';
				}
			}}
			{placeholder}
			{...$$restProps}
		/>
		{#if placeholder}<span class={inputPlaceholderVariants({ size })}>{placeholder}</span>{/if}
		{#if $inputValue !== ''}
			<button
				type="button"
				tabindex="-1"
				class={comboboxClearButtonVariants({ size })}
				on:click={() => clearValueAndInput()}><div class="i-lucide-x-circle" /></button
			>
		{/if}
		<div class={comboboxChevronVariants({ size })} />
	</label>
	{#if $open}
		<ul
			class={tooltipVariants({ size, class: ['relative', menuClasses] })}
			use:melt={$menu}
			use:minSameWidth
			transition:fly={{ duration: 150, y: -5 }}
		>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div class="flex min-h-0 flex-col gap-0 overflow-y-scroll" tabindex="0">
				{#each filteredOptions || [] as resultIndex, index (index)}
					{@const optionData = options[resultIndex]}
					<li
						class="px-3 py-1.5 scroll-my-2 cursor-pointer rounded-[--roundedness-sm] hover:(bg-gray-100) data-[highlighted]:bg-gray-200 select-none"
						use:melt={$option(optionData)}
						on:m-click={() => {
							lastAction = 'select';
						}}
					>
						<div class="break-words">{optionData.label}</div>
					</li>
				{:else}
					{#if !isLoading}
						<li class="px-3 py-1.5 rounded-[--roundedness-sm] select-none">
							{i18n.noSearchResult}
						</li>
					{/if}
				{/each}
			</div>
			{#if isLoading}
				<div class="px-3 py-1.5 flex items-center justify-center bg-white/50">
					<div class="i-svg-spinners-90-ring-with-bg size-5" />
				</div>
			{/if}
		</ul>
	{/if}
</div>
