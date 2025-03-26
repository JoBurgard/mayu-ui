<!--
SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
SPDX-License-Identifier: Unlicense

Inspired by https://github.com/TheHadiAhmadi/template/tree/main/src/lib/modal
-->

<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	type DialogParams = {
		open: boolean;
		component?: new (...args: any) => SvelteComponent;
		meta: {
			props?: any;
			settings?: ComponentProps<Dialog>;
			contexts?: Map<any, any>;
			resolve: (data: any) => void;
			reject: (reason?: any) => void;
		};
	};

	let currentDialog = 0;

	function createStore() {
		let { subscribe, set, update } = writable<Map<number, DialogParams>>(new Map());

		function prompt<Component extends SvelteComponent, Props extends ComponentProps<Component>>(
			component: new (...args: any) => Component,
			{
				props = {} as Props,
				settings = {},
				contexts,
			}: {
				props?: Props;
				settings?: ComponentProps<Dialog>;
				contexts?: Map<any, any>;
			} = {},
		): Promise<any> {
			return new Promise((resolve, reject) => {
				const thisDialog = currentDialog;
				currentDialog += 1;

				let componentDidResolve = false;
				function close() {
					update(($dialogs) => {
						$dialogs.delete(thisDialog);
						return $dialogs;
					});
				}
				update(($dialogs) => {
					$dialogs.set(thisDialog, {
						open: true,
						component,
						meta: {
							props,
							settings: merge(settings, {
								options: {
									onOpenChange: ({ next }) => {
										if (next === false && !componentDidResolve) {
											reject('Dialog was closed without resolving.');
										}
										return next;
									},
								},
							} satisfies ComponentProps<Dialog>),
							contexts,
							resolve: (data: any) => {
								componentDidResolve = true;
								close();
								resolve(data);
							},
							reject: (reason?: any) => {
								close();
								reject(reason);
							},
						},
					});
					return $dialogs;
				});
			});
		}

		return {
			subscribe,
			set,
			prompt,
		};
	}

	export const dialogs = createStore();
</script>

<script lang="ts">
	import Dialog from './Dialog.svelte';
	import type { ComponentProps, SvelteComponent } from 'svelte';
	import { merge } from 'lodash-es';
	import DialogContextProvider from './DialogContextProvider.svelte';
</script>

{#each $dialogs.values() as dialog}
	{#if dialog.open}
		<Dialog bind:open={dialog.open} {...dialog.meta.settings}>
			<DialogContextProvider
				contexts={dialog.meta.contexts}
				resolve={dialog.meta.resolve}
				reject={dialog.meta.reject}
			>
				<svelte:component this={dialog.component} {...dialog.meta.props} />
			</DialogContextProvider>
		</Dialog>
	{/if}
{/each}
