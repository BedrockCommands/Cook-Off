// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { Dimension, world, Player, BlockPermutation } from "@minecraft/server";
import { BlockStateSuperset } from "@minecraft/vanilla-data";

export default class Utils {
	private static overworld;

	static getOverworld(): Dimension {
		return Utils.overworld || (Utils.overworld = world.getDimension("minecraft:overworld"));
	}

	static getAllPlayers(): Player[] {
		return world.getAllPlayers();
	}

	static permutationWithState(permutation: BlockPermutation, stateName: string, value: string | number  | boolean | undefined) {
		return permutation.withState(stateName as keyof BlockStateSuperset, value);
	}
}