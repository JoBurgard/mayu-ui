/**
 * SPDX-FileCopyrightText: 2024 Jo Burgard <mail@joburgard.com>
 * SPDX-License-Identifier: Unlicense
 */

import { tv } from 'tailwind-variants';
import Popover from './Popover.svelte';
import PopoverTrigger from './PopoverTrigger.svelte';
import { tooltipVariants } from '../tooltip';

const popoverVariants = tv({
	extend: tooltipVariants,
});

export { Popover, PopoverTrigger, popoverVariants };
