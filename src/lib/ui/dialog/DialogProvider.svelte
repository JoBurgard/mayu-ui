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
		props?: any;
		dialogProps?: ComponentProps<Dialog>;
		resolve: (data: any) => void;
		reject: (reason?: any) => void;
	};

	let currentDialog = 0;

	function createStore() {
		let { subscribe, set, update } = writable<Map<number, DialogParams>>(new Map());

		function prompt<Component extends SvelteComponent, Props extends ComponentProps<Component>>(
			component: new (...args: any) => Component,
			props: Props = {} as Props,
			dialogProps: ComponentProps<Dialog> = {} as ComponentProps<Dialog>,
		): Promise<any> {
			return new Promise((resolve, reject) => {
				const thisDialog = currentDialog;
				currentDialog += 1;

				let componendDidResolve = false;
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
						props,
						dialogProps: merge(dialogProps, {
							options: {
								onOpenChange: ({ next }) => {
									if (next === false && !componendDidResolve) {
										reject('Dialog was closed without resolving.');
									}
									return next;
								},
							},
						} satisfies ComponentProps<Dialog>),
						resolve: (data: any) => {
							componendDidResolve = true;
							close();
							resolve(data);
						},
						reject: (reason?: any) => {
							close();
							reject(reason);
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
		<Dialog bind:open={dialog.open} {...dialog.dialogProps}>
			<DialogContextProvider resolve={dialog.resolve} reject={dialog.reject}>
				<svelte:component this={dialog.component} {...dialog.props} />
			</DialogContextProvider>
		</Dialog>
	{/if}
{/each}
