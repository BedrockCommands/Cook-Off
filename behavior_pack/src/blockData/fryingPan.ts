// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { BlockData } from "./blockDataManager";

export interface FryingPanBlockData extends BlockData {
	items: Array<string>
}

export function getDefaultFryingPanBlockData(): FryingPanBlockData {
	return { items: [] };
}