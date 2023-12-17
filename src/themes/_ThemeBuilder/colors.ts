/**
 * SPDX-FileCopyrightText: 2023 Jo Burgard <mail@joburgard.com>
 * SPDX-License-Identifier: Unlicense
 */

type Palette = any;

export function createPaletteStore() {
	const value: Palette = [];
	const subscribers: Array<(value: Palette) => void> = [];

	function subscribe(subscriberCallback: (value: Palette) => void) {
		subscribers.push(subscriberCallback);
		subscriberCallback(value);

		return function unsubscribe() {
			subscribers.splice(
				subscribers.findIndex((it) => it === subscriberCallback),
				1,
			);
		};
	}

	return {
		subscribe,
	};
}
