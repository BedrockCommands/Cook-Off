// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { Dimension, world, Player } from "@minecraft/server";

export default class Utils {
	static getOverworld(): Dimension {
		return world.getDimension("minecraft:overworld");
	}

	static getAllPlayers(): Player[] {
		return world.getAllPlayers();
	}
}