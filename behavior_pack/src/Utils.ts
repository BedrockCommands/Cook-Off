// SPDX-License-Identifier: MIT
// Copyright (c) @brodblox09 & Contributors
// Contributors: @brodblox09
// See LICENSE.md file in the root folder, licenses/MIT.md, or https://opensource.org/license/mit

import { Dimension, world, Player, BlockPermutation } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { BlockStateSuperset } from "@minecraft/vanilla-data";

export class Utils {
	private static overworld: Dimension;

	static getOverworld(): Dimension {
		return Utils.overworld || (Utils.overworld = world.getDimension("minecraft:overworld"));
	}

	static getAllPlayers(): Player[] {
		return world.getAllPlayers();
	}

	static permutationWithState(permutation: BlockPermutation, stateName: string, value: string | number | boolean | undefined): BlockPermutation {
		return permutation.withState(stateName as keyof BlockStateSuperset, value);
	}

	static showTextDisplayForm(title: string, text: string, player: Player) {
		new ActionFormData()
			.title(title)
			.body(text)
			.show(player);
	}
}