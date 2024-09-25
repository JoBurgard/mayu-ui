<!--
SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense
-->
<script lang="ts" context="module">
	/**
	 * These are the messages used in the component.
	 * When this is changed, then it is changed globally.
	 * Useful for i18n.
	 */
	export const i18n = {
		noSearchResult: 'No matching entry found.',
		emptyList: 'No Entries.',
	};
</script>

<script lang="ts" generics="D, V">
	import { browser } from '$app/environment';

	import { htmlEncode } from '$lib/utils';

	import type { EventHandler } from 'svelte/elements';

	import { comboboxChevronVariants, comboboxClearButtonVariants, comboboxInputVariants } from '.';

	import uFuzzy, {
		type HaystackIdxs,
		type Info,
		type InfoIdxOrder,
		type Options,
	} from '@leeoniya/ufuzzy';
	import { createCombobox, melt, type ComboboxOptionProps } from '@melt-ui/svelte';
	import { beforeUpdate, createEventDispatcher, tick } from 'svelte';
	import type { Action } from 'svelte/action';
	import { fly } from 'svelte/transition';
	import { inputPlaceholderVariants, type InputEvents, type InputProps } from '../input';
	import { tooltipVariants } from '../tooltip';

	type $$Props = Omit<InputProps, 'value'> & {
		data: D[];
		value: V | undefined;
		arbitraryValue?: boolean;
		isLoading?: boolean;
		unstyled?: boolean;
		menuClasses?: string;
		hideClearButton?: boolean;
		hideChevronIcon?: boolean;
		createHaystack?: (item: D) => string;
		dataToOption?: (item: D) => ComboboxOptionProps<V> & Record<string, any>;
		valueToData?: (value: V) => D;
		optionToDisplayText?: (
			option: (ComboboxOptionProps<V> & Record<string, any>) | undefined,
		) => string;
		equal?: (a: V | undefined, b: V | undefined) => boolean;
		listSize?: number;
		searchOptions?: Options;
		searchOutOfOrder?: number;
		rankThreshold?: number;
		messages?: Partial<typeof i18n>;
	};

	type $$Events = InputEvents & {
		select: CustomEvent<{
			value: V | undefined;
			option: (ComboboxOptionProps<V> & Record<string, any>) | undefined;
		}>;
		noselectblur: CustomEvent<null>;
		noselectenter: CustomEvent<null>;
	};

	export let data: $$Props['data'];
	let className: $$Props['class'] = undefined;
	export { className as class };
	export let value: $$Props['value'] = undefined;
	export let arbitraryValue: $$Props['arbitraryValue'] = false;
	export let placeholder: $$Props['placeholder'] = undefined;
	export let size: $$Props['size'] = undefined;
	export let status: $$Props['status'] = undefined;
	export let unstyled: $$Props['unstyled'] = false;
	export let menuClasses: $$Props['menuClasses'] = undefined;
	export let isLoading: $$Props['isLoading'] = false;
	export let hideClearButton: $$Props['hideClearButton'] = false;
	export let hideChevronIcon: $$Props['hideChevronIcon'] = false;
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
	export let valueToData: Required<$$Props>['valueToData'] = (value) =>
		({ label: value, value }) as unknown as D;
	export let optionToDisplayText: Required<$$Props>['optionToDisplayText'] = (option) =>
		option?.label || '';
	/**
	 * Default: Strings are compared as lowercase. Everything else is compared by `===`.
	 */
	export let equal: Required<$$Props>['equal'] = (a, b) => {
		if (!arbitraryValue && typeof a === 'string' && typeof b === 'string') {
			return a.toLowerCase() === b.toLowerCase();
		}
		return a === b;
	};
	/**
	 * Defines the initial amount of list items that are rendered.
	 * When the user scrolls to the end, it adds the next block to the list.
	 */
	export let listSize: Required<$$Props>['listSize'] = 100;
	/**
	 * Default: `{ intraMode: 1 }`
	 * @see https://github.com/leeoniya/uFuzzy?tab=readme-ov-file#options
	 */
	export let searchOptions: Required<$$Props>['searchOptions'] = { intraMode: 1 };
	/**
	 * Setting for matching the search words out of order. Slows down fast. Be careful.
	 * Default: `0`
	 */
	export let searchOutOfOrder: Required<$$Props>['searchOutOfOrder'] = 0;
	/**
	 * Determines when to start sorting and ranking the results after filtering. (When results count <= threshold)
	 * Default: `1_000`
	 */
	export let rankThreshold: Required<$$Props>['rankThreshold'] = 1_000;
	/**
	 * This is for overwriting the text messages of the component.
	 */
	export let messages: Required<$$Props>['messages'] = {};

	let options: ComboboxOptionProps<V>[] = data.map((it) => dataToOption(it));
	let valueInternal: $$Props['value'];
	let lastAction: 'input' | 'select' | null = null;
	let skipProcessingOnClose = false;
	let dispatchedSelect = false;
	let dispatchedNoSelectBlur = false;
	let inputField: HTMLInputElement;
	let menuElement: HTMLUListElement | null;
	let listStartIndex = 0;
	let listEndIndex: number = listSize;

	const dispatch = createEventDispatcher<{
		select: $$Events['select']['detail'];
		noselectblur: $$Events['noselectblur']['detail'];
		noselectenter: $$Events['noselectenter']['detail'];
	}>();

	// #region Search

	const fuzzySearch = new uFuzzy(searchOptions);
	let haystack: string[] = [];
	let showAllResult: number[] = [];
	let filteredResults: { idxs: HaystackIdxs; info: Info | null; order: InfoIdxOrder | null } = {
		idxs: [],
		info: null,
		order: [],
	};
	let resultsToShow: number[] = [];

	function updateResultsList() {
		resultsToShow = (filteredResults?.order ?? []).slice(listStartIndex, listEndIndex);
	}

	function search(haystack: string[], searchText: string) {
		// this scrolls the selected item to the top
		// scrollIntoView cannot be used as it scrolls the entire browser window
		// and not just the container
		if (browser) {
			setTimeout(() => {
				if ($highlightedItem && menuElement) {
					menuElement.scrollTo({
						behavior: 'instant',
						top:
							$highlightedItem.offsetTop -
							Number(
								window.getComputedStyle(menuElement, null).getPropertyValue('padding').slice(0, -2),
							),
					});
				}
			}, 0);
		}

		if (searchText !== '') {
			// reset list size on every search
			listStartIndex = 0;
			listEndIndex = listSize;
			if (arbitraryValue === false) {
				tick().then(() => {
					if (menuElement) {
						const firstItem = menuElement.querySelector<HTMLUListElement>(
							'li[data-melt-combobox-option]',
						);
						if (firstItem) {
							// have to use setTimeout or otherwise Chrome bugs out
							// maybe there is a better way
							setTimeout(() => ($highlightedItem = firstItem), 0);
						}
					}
				});
			}
			const result = fuzzySearch.search(haystack, searchText, searchOutOfOrder, rankThreshold);

			if (result[2]) {
				filteredResults.idxs = result[0];
				filteredResults.info = result[1];
				filteredResults.order = result[2];
				updateResultsList();

				return;
			} else if (result[0]) {
				filteredResults.idxs = result[0];
				filteredResults.info = result[1];
				filteredResults.order = result[0].map((_, index) => index);
				updateResultsList();

				return;
			}
		}
		filteredResults.idxs = showAllResult;
		filteredResults.info = null;
		filteredResults.order = showAllResult;
		updateResultsList();
	}

	function updateSearchData(data: D[]) {
		haystack = new Array(data.length);
		options = new Array(data.length);
		showAllResult = new Array(data.length);

		for (let i = 0; i < data.length; i += 1) {
			haystack[i] = createHaystack(data[i]);
			options[i] = dataToOption(data[i]);
			showAllResult[i] = i;
		}

		if ($open) {
			search(haystack, $inputValue);
		}
	}

	// #endregion

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, selected, highlightedItem },
		ids: { trigger: triggerId },
	} = createCombobox<V>({
		forceVisible: true,
		positioning: {
			placement: 'bottom-start',
			sameWidth: false,
		},
		loop: false,
		highlightOnHover: false,
		onOpenChange: ({ next }) => {
			dispatchedNoSelectBlur = false;
			if (next === false && skipProcessingOnClose === false) {
				processInputValue();
			}
			if (next === false) {
				$highlightedItem = null;
				lastAction = null;
				if (!dispatchedSelect && document.activeElement !== inputField) {
					dispatchedNoSelectBlur = true;
					dispatch('noselectblur');
				}
			}
			if (next === true) {
				skipProcessingOnClose = false;
				dispatchedSelect = false;
				search(haystack, '');

				if (arbitraryValue === false && $inputValue === '') {
					tick().then(() => {
						if (menuElement) {
							const firstItem = menuElement.querySelector<HTMLUListElement>(
								'li[data-melt-combobox-option]',
							);
							if (firstItem) {
								$highlightedItem = firstItem;
							}
						}
					});
				}
			}
			return next;
		},
		onSelectedChange: ({ next }) => {
			dispatchedSelect = true;

			if (!(next === undefined && lastAction === undefined)) {
				value = next?.value;
				valueInternal = value;
				const optionIndex = options.findIndex((option) => equal(option.value, value));
				const foundOption = optionIndex > -1 ? options[optionIndex] : undefined;

				updateListIndices(
					optionIndex - Math.floor(listSize / 2),
					optionIndex + Math.floor(listSize / 2),
				);

				dispatch('select', {
					value,
					option: foundOption,
				});
			}

			return next;
		},
	});

	// initially set the value of the input field
	// otherwise it would be empty if value is just a string
	if (typeof value === 'string') {
		$inputValue = value;
	}

	function updateListIndices(start: number, end: number) {
		listStartIndex = start;
		listEndIndex = end;

		if (listStartIndex < 0) {
			listStartIndex = 0;
		}
	}

	function pickOptionByValue() {
		const optionIndex = options.findIndex((option) => equal(option.value, value));
		const foundOption = optionIndex > -1 ? options[optionIndex] : undefined;
		if (foundOption === undefined && ((arbitraryValue && value !== undefined) || value === '')) {
			$selected = dataToOption(valueToData(value));
			$inputValue = optionToDisplayText($selected);
			valueInternal = value;
		} else if (foundOption !== undefined) {
			updateListIndices(
				optionIndex - Math.floor(listSize / 2),
				optionIndex + Math.floor(listSize / 2),
			);
			updateResultsList();

			$selected = foundOption;
			$inputValue = optionToDisplayText($selected);
			valueInternal = value;
		} else {
			value = valueInternal;
		}
	}

	function checkIfUpdateFromOutside() {
		if (value !== valueInternal) {
			if (value === undefined) {
				clearValueAndInput();
				valueInternal = value;
				return;
			}
			pickOptionByValue();
		}
	}

	function handleInput() {
		lastAction = 'input';
		$highlightedItem = null;
	}

	const handleEnterKey = (event: InputEvents['keydown']) => {
		if (event.key !== 'Enter') {
			return;
		}

		event.preventDefault();
		event.stopPropagation();

		processInputValue();

		if (!dispatchedSelect) {
			dispatch('noselectenter');
		}
		dispatchedSelect = false;
	};

	function clearValueAndInput() {
		$inputValue = '';
		$selected = undefined;
	}

	function processInputValue() {
		if (lastAction === 'input' && $inputValue === '') {
			clearValueAndInput();
		} else if (lastAction === 'input') {
			value = $inputValue as V;
			pickOptionByValue();
		} else if (lastAction === 'select' || !arbitraryValue) {
			$inputValue = optionToDisplayText($selected);
		}
	}

	const minSameWidth: Action<HTMLUListElement> = (element) => {
		const inputElement = document.getElementById($input.id);
		element.style.minWidth = `${inputElement?.getBoundingClientRect().width}px`;
	};

	const scrollThreshold = 10;
	const handleScroll: EventHandler<Event, HTMLUListElement> = (event) => {
		const scrollPosition = event.currentTarget.scrollTop + event.currentTarget.clientHeight;

		// reached top & not showing all results yet
		if (
			event.currentTarget.scrollTop <= scrollThreshold &&
			resultsToShow.length < filteredResults.idxs.length
		) {
			updateListIndices(listStartIndex - listSize, listEndIndex);
			updateResultsList();
			return;
		}

		// reached bottom & not showing all results yet
		if (
			scrollPosition + scrollThreshold >= event.currentTarget.scrollHeight &&
			resultsToShow.length < filteredResults.idxs.length
		) {
			updateListIndices(listStartIndex, listEndIndex + listSize);
			updateResultsList();
			return;
		}
	};

	$: updateSearchData(data);
	$: mergedMessages = Object.assign(structuredClone(i18n), messages);

	// detect changes from the outside and try to match the option
	beforeUpdate(() => {
		checkIfUpdateFromOutside();
	});

	// run on SSR
	checkIfUpdateFromOutside();
</script>

<div class="isolate flex h-full">
	<label class="relative grow flex flex-col" use:melt={$label}>
		<input
			bind:this={inputField}
			use:melt={$input}
			class={comboboxInputVariants({
				size,
				status,
				unstyled,
				class: className,
			})}
			on:blur
			on:blur={(event) => {
				if (
					event.relatedTarget?.dataset?.comboboxClearButton === $triggerId ||
					event.relatedTarget === inputField
				) {
					return;
				}
				if (!arbitraryValue) {
					$inputValue = optionToDisplayText($selected);
				}
				if (!$open && !dispatchedNoSelectBlur) {
					dispatch('noselectblur');
				}
			}}
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
			on:m-input={(event) => {
				search(haystack, event.detail.originalEvent.currentTarget?.value ?? '');
			}}
			on:m-keydown={(e) => {
				// Prevent selecting value when closing by escape
				if (e.detail.originalEvent.key === 'Escape') {
					skipProcessingOnClose = true;
				}
				if (e.detail.originalEvent.key === 'Enter' && $highlightedItem) {
					lastAction = 'select';
				}
			}}
			on:m-click={() => {
				skipProcessingOnClose = true;
			}}
			{placeholder}
			aria-invalid={status ? 'true' : undefined}
			{...$$restProps}
		/>
		{#if placeholder}<span class={inputPlaceholderVariants({ size, status })}>{placeholder}</span
			>{/if}
		{#if $inputValue !== '' && !hideClearButton}
			<button
				type="button"
				tabindex="-1"
				class={comboboxClearButtonVariants({ size })}
				data-combobox-clear-button={$triggerId}
				on:click={(event) => {
					clearValueAndInput();
					search(haystack, '');
					inputField.click();
					event.preventDefault();
					event.stopPropagation();
				}}><div class="i-lucide-x-circle" /></button
			>
		{/if}
		{#if !hideChevronIcon}
			<div class={comboboxChevronVariants({ size })} />
		{/if}
	</label>
	{#if $open}
		<ul
			bind:this={menuElement}
			class={tooltipVariants({ size, class: ['relative', menuClasses] })}
			use:melt={$menu}
			use:minSameWidth
			transition:fly={{ duration: 150, y: -5 }}
			on:scroll={handleScroll}
		>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div class="flex min-h-0 flex-col gap-0" tabindex="0">
				{#each resultsToShow ?? [] as orderedIndex (orderedIndex)}
					{@const optionData = options[filteredResults.idxs[orderedIndex]]}
					<li
						class="px-3 py-1.5 scroll-my-2 cursor-pointer rounded-[--roundedness-sm] hover:(bg-gray-100) data-[highlighted]:bg-gray-200 select-none transition-colors ease-out duration-75"
						use:melt={$option(optionData)}
						on:m-click={() => {
							lastAction = 'select';
						}}
					>
						<div class="break-words">
							<slot
								isFiltered={!!filteredResults.info}
								ranges={filteredResults?.info?.ranges[orderedIndex] ?? []}
								option={optionData}
								{htmlEncode}
								highlight={uFuzzy.highlight}
							>
								{#if filteredResults.info}
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html uFuzzy.highlight(
										htmlEncode(optionData.label ?? ''),
										filteredResults.info.ranges[orderedIndex],
									)}
								{:else}
									{optionData.label}
								{/if}
							</slot>
						</div>
					</li>
				{:else}
					{#if !isLoading}
						{#if $inputValue !== ''}
							<li class="px-3 py-1.5 rounded-[--roundedness-sm] select-none">
								{mergedMessages.noSearchResult}
							</li>
						{:else}
							<li class="px-3 py-1.5 rounded-[--roundedness-sm] select-none">
								{mergedMessages.emptyList}
							</li>
						{/if}
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
